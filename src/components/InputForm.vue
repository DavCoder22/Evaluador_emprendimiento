<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div class="form-group">
      <label for="descripcion_negocio">Descripción del Negocio:</label>
      <textarea 
        id="descripcion_negocio" 
        v-model="descripcion_negocio" 
        @input="validateDescription" 
        maxlength="200" 
        required>
      </textarea>
      <small v-if="descripcionError" class="error-message">{{ descripcionError }}</small>
    </div>
    <div class="form-group">
      <label for="monto_inversion">Monto de Inversión:</label>
      <input 
        type="number" 
        id="monto_inversion" 
        v-model="monto_inversion" 
        @input="validateMonto" 
        required />
      <small v-if="montoError" class="error-message">{{ montoError }}</small>
    </div>
    <div class="form-group">
      <label for="pregunta">Pregunta Específica:</label>
      <input 
        type="text" 
        id="pregunta" 
        v-model="pregunta" 
        @input="validatePregunta" 
        maxlength="100" 
        required />
      <small v-if="preguntaError" class="error-message">{{ preguntaError }}</small>
    </div>
    <button type="submit" class="submit-button">Enviar</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      descripcion_negocio: '',
      monto_inversion: '',
      pregunta: '',
      descripcionError: '',
      montoError: '',
      preguntaError: ''
    };
  },
  methods: {
    validateDescription() {
      const regex = /^[A-Za-z0-9\s]*$/;
      if (!regex.test(this.descripcion_negocio)) {
        this.descripcionError = 'La descripción solo debe contener letras y números, sin símbolos.';
      } else {
        this.descripcionError = '';
      }
    },
    validateMonto() {
      if (this.monto_inversion < 0 || isNaN(this.monto_inversion)) {
        this.montoError = 'El monto de inversión debe ser un número positivo.';
      } else {
        this.montoError = '';
      }
    },
    validatePregunta() {
      const regex = /^[A-Za-z0-9\s]*$/;
      if (!regex.test(this.pregunta)) {
        this.preguntaError = 'La pregunta solo debe contener letras y números, sin símbolos.';
      } else {
        this.preguntaError = '';
      }
    },
    submitForm() {
      this.validateDescription();
      this.validateMonto();
      this.validatePregunta();
      
      if (!this.descripcionError && !this.montoError && !this.preguntaError) {
        const inputData = {
          descripcion_negocio: this.descripcion_negocio,
          monto_inversion: this.monto_inversion,
          pregunta: this.pregunta
        };
        this.$emit('form-submit', inputData);
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 500px;
  margin: auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
  color: #333;
}

textarea,
input[type="number"],
input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.submit-button {
  padding: 12px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: -5px;
}
</style>
