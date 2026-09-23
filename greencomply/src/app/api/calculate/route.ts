import { NextResponse } from 'next/server';
import { calculate } from '@/lib/engine';
import { ZodError } from 'zod';
export async function POST(req:Request){try{return NextResponse.json(calculate(await req.json()));}catch(e){return NextResponse.json({error:e instanceof ZodError?e.issues:e instanceof Error?e.message:'Invalid input'},{status:400});}}