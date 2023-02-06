<script setup lang="ts">

    import { ElNotification } from 'element-plus'
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import api from './../services/api'
    
    const router = useRouter()

    const props = defineProps({
        type: String
    })

    const loading = ref(false)

    const id = ref('')
    const nome = ref('')

    onMounted(async () => {
        loading.value = true
        if (props.type === 'editar') {
            id.value = router.currentRoute.value.params.id
            await carregar()
        }
        loading.value = false
    })

    const carregar = async () => {
        const response = await api.get('/categorias/' + id.value)
        id.value = response.data.id
        nome.value = response.data.nome
    }

    const salvar = async () => {

        try {

            loading.value = true

            let response

            if (props.type === 'cadastrar') {
                response = await api.post('/categorias', { nome: nome.value }).catch(error => {
                    return error.response
                })
            } else {
                response = await api.patch('/categorias/' + id.value, { nome: nome.value }).catch(error => {
                    return error.response
                })
            }

            if (response.status == 201 || response.status == 200) {
                ElNotification({
                    title: 'Success',
                    message: 'Categoria foi salva com sucesso!',
                    type: 'success',
                })

                router.push({ name: 'categorias' })
            } else {
                throw response.data.message[0]
            }

        }
        catch (error) {
            ElNotification({
                title: 'Erro',
                message: error || 'Erro ao cadastrar categoria!',
                type: 'error',
            })
        } finally {
            loading.value = false
        }

    }

</script>

<template>

    <div class="form">
        
        <div>
            <label>Categoria:</label>
            <input v-model="nome" />
        </div>
        
        <el-button @click="salvar()" color="#1e3454">Salvar</el-button>

    </div>

  
</template>

