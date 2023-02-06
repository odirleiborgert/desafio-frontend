<script setup lang="ts">

    import { ElNotification } from 'element-plus'
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import api from './../services/api'

    const router = useRouter()

    const props = defineProps({
        type: String
    })

    const categoriasAll = ref([])

    const loading = ref(false)

    const id = ref('')
    const idCategoria = ref('')
    const tipo = ref('')
    const marca = ref('')
    const modelo = ref('')
    const placa = ref('')
    const renavam = ref('')
    const ano = ref(0)
    const peso = ref(0)
    const cor = ref('')
    const status = ref(1)


    onMounted(async () => {
        loading.value = true
        await categorias()
        if (props.type === 'editar') {
            id.value = router.currentRoute.value.params.id
            await carregar()
        }
        loading.value = false
    })

    const categorias = async () => {
        const response = await api.get('/categorias')
        categoriasAll.value = response.data
    }

    const carregar = async () => {
        const response = await api.get('/veiculos/' + id.value)
        id.value = response.data.id
        idCategoria.value = response.data.idCategoria
        tipo.value = response.data.tipo
        marca.value = response.data.marca
        modelo.value = response.data.modelo
        placa.value = response.data.placa
        renavam.value = response.data.renavam
        ano.value = response.data.ano
        peso.value = response.data.peso
        cor.value = response.data.cor
        status.value = response.data.status
    }

    const salvar = async () => {

        try {
            
            loading.value = true
            
            let response

            let dataSave = {
                idCategoria: idCategoria.value,
                tipo: tipo.value,
                marca: marca.value,
                modelo: modelo.value,
                placa: placa.value,
                renavam: renavam.value,
                ano: parseInt(ano.value),
                peso: parseInt(peso.value),
                cor: cor.value,
                status: status.value
            }

            if (props.type === 'cadastrar') {
                response = await api.post('/veiculos', dataSave).catch(error => {
                    return error.response
                })
            } else {
                response = await api.patch('/veiculos/' + id.value, dataSave).catch(error => {
                    return error.response
                })
            }

            if (response.status == 201 || response.status == 200) {
                ElNotification({
                    title: 'Success',
                    message: 'Veículo foi salvo com sucesso!',
                    type: 'success',
                })
                router.push({ name: 'veiculos' })
            } else {
                throw response.data.message[0]
            }

        } catch (error) {
            ElNotification({
                title: 'Error',
                message: error || 'Erro ao cadastrar veículo!',
                type: 'error',
            })
        } finally {
            loading.value = false
        }


    }

</script>

<template>

    <div class="form" v-loading="loading">
        
        <div>
            <label>Categoria:</label>
            <select v-model="idCategoria">
                <option v-for="(categoria, key) in categoriasAll" :value="categoria.id" :key="key">{{ categoria.nome }}</option>
            </select>
        </div>

        <div>
            <label>Tipo:</label>
            <input v-model="tipo" />
        </div>

        <div>
            <label>Marca:</label>
            <input v-model="marca" />
        </div>

        <div>
            <label>Modelo:</label>
            <input v-model="modelo" />
        </div>

        <div>
            <label>Placa:</label>
            <input v-model="placa" />
        </div>

        <div>
            <label>Renavam:</label>
            <input v-model="renavam" />
        </div>

        <div>
            <label>Ano:</label>
            <input v-model="ano" />
        </div>

        <div>
            <label>Peso:</label>
            <input v-model="peso" />
        </div>

        <div>
            <label>Cor:</label>
            <input v-model="cor" />
        </div>

        <div>
            <label>Status:</label>
            <select v-model="status">
                <option :value="1">Ativo</option>
                <option :value="0">Inativo</option>
            </select>
        </div>
        
        <el-button @click="salvar()" color="#1e3454">Salvar</el-button>
        
    </div>

</template>

