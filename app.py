import streamlit as st

st.set_page_config(page_title="GreenComply RCO Engine", page_icon="⚡", layout="centered")

st.title("🌱 GreenComply: RCO Engine MVP")
st.write("Lightweight compliance calculator for renewable consumption obligations.")
st.markdown("---")

st.sidebar.header("Facility Parameters")
industry = st.sidebar.selectbox("Sector", ["Data Center / Cloud", "Heavy Manufacturing", "Chemicals"])
consumption = st.sidebar.number_input("Annual Consumption (Million Units / GWh)", min_value=1.0, value=50.0)
re_share = st.slider("Current Certified Renewable Share (%)", 0.0, 100.0, 20.0)

MANDATED_TARGET = 35.95
total_kwh = consumption * 1_000_000
mandated_kwh = total_kwh * (MANDATED_TARGET / 100.0)
current_kwh = total_kwh * (re_share / 100.0)

shortfall_kwh = max(0.0, mandated_kwh - current_kwh)
shortfall_mu = shortfall_kwh / 1_000_000
score = min(100.0, (re_share / MANDATED_TARGET) * 100.0)

col1, col2 = st.columns(2)
with col1:
    st.metric(label="Mandated RCO Target", value=f"{MANDATED_TARGET}%")
with col2:
    st.metric(label="Compliance Score", value=f"{score:.1f}%")

st.markdown("### 📊 Analysis & Recommendations")

if shortfall_kwh > 0:
    st.error(f"⚠️ **Deficit Detected:** Your facility is short by **{shortfall_mu:.2f} Million Units (MU)** against national RCO mandates.")
    st.info("💡 **Recommended Action:** Procure open-market Renewable Energy Certificates (RECs) or lock in a short-term green open-access PPA to cover the gap.")
else:
    st.success("🎉 **Fully Compliant:** Your current renewable consumption footprint meets or exceeds statutory targets!")

st.markdown("---")
st.caption("GreenComply MVP | Zero-Dependency Core Build")
