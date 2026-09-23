import Decimal from 'decimal.js';
import { z } from 'zod';
export const siteSchema=z.object({id:z.string().min(1),name:z.string().min(1),state:z.string().min(1),energyMU:z.number().finite().nonnegative(),greenShare:z.number().finite().min(0).max(100)});
export const assumptionsSchema=z.object({targetPercent:z.number().finite().min(0).max(100),emissionFactor:z.number().finite().nonnegative(),penaltyPerKwh:z.number().finite().nonnegative(),recPerKwh:z.number().finite().nonnegative(),ppaPerKwh:z.number().finite().nonnegative().optional(),financialYear:z.string().min(1),sourceNote:z.string().optional()});
export const inputSchema=z.object({sites:z.array(siteSchema).min(1).max(1000),assumptions:assumptionsSchema});
export type Input=z.infer<typeof inputSchema>;
const d=(n:number)=>new Decimal(n);
const num=(n:Decimal)=>n.toNumber();
export function calculate(raw:Input){
 const {sites,assumptions:a}=inputSchema.parse(raw);
 if(new Set(sites.map(s=>s.id)).size!==sites.length)throw new Error('Duplicate site IDs');
 const rows=sites.map(s=>{const energy=d(s.energyMU),green=energy.mul(s.greenShare).div(100),required=energy.mul(a.targetPercent).div(100),deficit=Decimal.max(0,required.minus(green));return {...s,greenMU:num(green),requiredMU:num(required),shortfallMU:num(deficit)};});
 const total=rows.reduce((v,s)=>v.plus(s.energyMU),d(0)),green=rows.reduce((v,s)=>v.plus(s.greenMU),d(0)),required=total.mul(a.targetPercent).div(100),shortfall=Decimal.max(0,required.minus(green));
 const gross=total.mul(1000).mul(a.emissionFactor).div(1000),offset=green.mul(1000).mul(a.emissionFactor).div(1000);
 const exposure=shortfall.mul(1_000_000).mul(a.penaltyPerKwh),rec=shortfall.mul(1_000_000).mul(a.recPerKwh);
 return {rows,totalMU:num(total),greenMU:num(green),weightedGreenPercent:total.isZero()?0:num(green.div(total).mul(100)),requiredMU:num(required),shortfallMU:num(shortfall),grossKtCO2:num(gross),illustrativeOffsetKtCO2:num(offset),illustrativeNetKtCO2:num(gross.minus(offset)),penaltyScenarioINR:num(exposure),recScenarioINR:num(rec),ppaScenarioINR:a.ppaPerKwh===undefined?null:num(shortfall.mul(1_000_000).mul(a.ppaPerKwh)),assumptions:a,disclaimer:'Scenario only. RCO eligible consumption and Scope 2 market-based accounting require separately verified source data; financial exposure is not an assessed statutory penalty.'};
}