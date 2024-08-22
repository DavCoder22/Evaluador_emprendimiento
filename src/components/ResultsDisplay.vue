<template>
  <div class="results-container">
    <h2>Resultado del Análisis de Viabilidad</h2>
    <div v-if="result">
      <div>
        <strong>Viabilidad:</strong> {{ parsedResult.Viabilidad }}
      </div>
      <div>
        <strong>Justificación:</strong> {{ parsedResult.Justificación }}
      </div>
      <div>
        <h3>Plan de Financiación:</h3>
        <ul>
          <li><strong>Monto de Inversión:</strong> {{ parsedResult["Plan de Financiación"]["Monto de Inversión"] }}</li>
          <li><strong>ROE (Return on Equity):</strong> {{ parsedResult["Plan de Financiación"].ROE }}</li>
          <li><strong>ROA (Return on Assets):</strong> {{ parsedResult["Plan de Financiación"].ROA }}</li>
          <li><strong>Endeudamiento:</strong> {{ parsedResult["Plan de Financiación"].Endeudamiento }}</li>
        </ul>
      </div>
      <div>
        <h3>Proyección de la Empresa:</h3>
        <ul>
          <li><strong>Año 1:</strong> {{ formatProjection(parsedResult["Proyección de la Empresa"]["Año 1"]) }}</li>
          <li><strong>Año 2:</strong> {{ formatProjection(parsedResult["Proyección de la Empresa"]["Año 2"]) }}</li>
          <li><strong>Año 3:</strong> {{ formatProjection(parsedResult["Proyección de la Empresa"]["Año 3"]) }}</li>
        </ul>
      </div>
      <div>
        <h3>Recomendaciones:</h3>
        <ul>
          <li v-for="(recommendation, index) in parsedResult.Recomendaciones" :key="index">
            {{ recommendation }}
          </li>
        </ul>
      </div>
      <div v-if="parsedResult['Respuesta Fuera de Contexto']">
        <strong>Respuesta Fuera de Contexto:</strong> {{ parsedResult['Respuesta Fuera de Contexto'] }}
      </div>
    </div>
    <div v-else>
      <p>No se ha recibido ningún resultado.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsDisplay',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    parsedResult() {
      try {
        // Elimina cualquier bloque de código que pueda estar alrededor del JSON
        const cleanedText = this.result.outputs[0].outputs[0].results.message.data.text.replace(/```json|```/g, '');
        return JSON.parse(cleanedText);
      } catch (error) {
        console.error('Error al parsear el JSON:', error);
        return null;
      }
    }
  },
  methods: {
    formatProjection(projection) {
      if (!projection) return 'No hay suficiente información.';
      return `Ingresos: ${projection.Ingresos}, Gastos: ${projection.Gastos}, Utilidad Bruta: ${projection["Utilidad Bruta"]}, Utilidad Neta: ${projection["Utilidad Neta"]}`;
    }
  }
};
</script>

<style scoped>
.results-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
}

h2 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 20px;
}

h3 {
  font-size: 20px;
  margin-top: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

strong {
  color: #333;
}
</style>
