<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue'
    import brasiliaApi from './../../services/brasilapi'
    
    const tableData = ref([])
    const tipo = ref('carros')
    const loading = ref(false)
   
    onMounted(async () => {
        
    })

    const carregar = async () => {
        loading.value = true
        tableData.value = []
        const response = await brasiliaApi.get(`/marcas/v1/${tipo.value}`)
        tableData.value = response.data
        loading.value = false
    }
    
</script>

<template>

    <h1>Brasil API - Busca Marcas</h1>

    <div class="form">
        <div>
            <label>Selecione o tipo:</label>
            <select v-model="tipo">
                <option value="carros">Carros</option>
                <option value="motos">Motos</option>
                <option value="caminhoes">Caminhões</option>
            </select>
        </div>
        <el-button color="#1e3454" @click="carregar()">Carregar</el-button>
    </div>


    <br>
    <br>

    <el-table :data="tableData" style="width: 100%" empty-text="Nenhum item para listar" v-loading="loading">
        <el-table-column prop="nome" label="Nome"></el-table-column>
        <el-table-column prop="valor" label="Valor"></el-table-column>
    </el-table>

</template>


