<template>
  <div id="app">
    <h1>Análisis de Viabilidad de Negocios</h1>
    <InputForm @form-submit="handleFormSubmit" />
    <ResultsDisplay v-if="result && !result.isHtml" :result="result" />
    <div v-if="result && result.isHtml" v-html="result.html" />
  </div>
</template>

<script>
import InputForm from './components/InputForm.vue';
import ResultsDisplay from './components/ResultsDisplay.vue';
import LangflowClient from './langflow/LangflowClient.js';

export default {
  name: 'App',
  components: {
    InputForm,
    ResultsDisplay,
  },
  data() {
    return {
      result: null,
    };
  },
  methods: {
    async handleFormSubmit(inputData) {
        const langflowClient = new LangflowClient('http://127.0.0.1:7860', 'kKLlGzBBUP9B4-uk9RmHMPZOgSYf_fTE');
        try {
            const response = await langflowClient.initiateSession(inputData);
            this.result = response;  // Ahora maneja tanto JSON como HTML
        } catch (error) {
            console.error('Error al ejecutar el flujo:', error);
        }
    }
},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
