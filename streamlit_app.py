import streamlit as st

# Konfigurácia stránky
st.set_page_config(
    page_title='Sonkas bum ride',
    page_icon='🚗',
    layout='centered'
)

# Hlavný nadpis
st.title('🚗 Sonkas ride')
st.subheader('Kalkulačka ceny cesty')

# Vytvorenie dvoch stĺpcov pre lepší layout
col1, col2 = st.columns(2)

with col1:
    # Vstupné polia - prvý stĺpec
    kilometre = st.number_input(
        'Počet km',
        min_value=0.0,
        format="%.2f",
        help="Celkový počet kilometrov trasy"
    )
    
    spotreba_na_100_km = st.number_input(
        'Spotreba na 100 km (litrov/100 km)',
        min_value=0.0,
        format="%.1f",
        help="Spotreba paliva vozidla na 100 kilometrov"
    )

with col2:
    # Vstupné polia - druhý stĺpec
    cena_za_liter = st.number_input(
        'Cena za 1 liter (€/liter)',
        min_value=0.0,
        format="%.2f",
        help="Cena jedného litra paliva"
    )
    
    pocet_ludi = st.number_input(
        'Počet ľudí v aute (osôb)',
        min_value=1,
        step=1,
        help="Počet osôb cestujúcich vo vozidle"
    )

# Tlačidlo na výpočet
st.markdown("---")
if st.button('🧮 Vypočítať', use_container_width=True, type="primary"):
    # Validácia vstupov
    if kilometre <= 0:
        st.error("❌ Počet kilometrov musí byť väčší ako 0.")
    elif cena_za_liter <= 0:
        st.error("❌ Cena za liter musí byť väčšia ako 0.")
    elif spotreba_na_100_km <= 0:
        st.error("❌ Spotreba na 100 km musí byť väčšia ako 0.")
    elif pocet_ludi <= 0:
        st.error("❌ Počet ľudí v aute musí byť väčší ako 0.")
    else:
        # Výpočty podľa vzorcov
        spotreba_na_trasu = (kilometre / 100) * spotreba_na_100_km
        cena_za_cestu = spotreba_na_trasu * cena_za_liter
        cena_na_osobu = cena_za_cestu / pocet_ludi

        # Zobrazenie výsledkov
        st.success("✅ Výpočet dokončený!")
        st.markdown("---")
        st.subheader('📊 Výsledky:')
        
        # Výsledky v troch stĺpcoch
        result_col1, result_col2, result_col3 = st.columns(3)
        
        with result_col1:
            st.metric(
                label="⛽ Spotreba na trasu",
                value=f"{spotreba_na_trasu:.2f}",
                help="Celková spotreba paliva na trasu"
            )
            st.caption("litrov")
        
        with result_col2:
            st.metric(
                label="💰 Cena za celú cestu",
                value=f"{cena_za_cestu:.2f} €",
                help="Celková cena paliva na cestu"
            )
            st.caption("celkom")
        
        with result_col3:
            st.metric(
                label="👥 Cena na osobu",
                value=f"{cena_na_osobu:.2f} €",
                help="Cena paliva na jednu osobu"
            )
            st.caption("na osobu")

# Informácie o aplikácii
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #666; font-size: 0.8em;'>
        Kalkulačka ceny cesty • Sonkas ride 🚗
    </div>
    """,
    unsafe_allow_html=True
)
