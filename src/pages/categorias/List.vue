<script setup lang="ts">

    import { ElNotification } from 'element-plus'
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import api from './../../services/api'

    const router = useRouter()

    const loading = ref(false)
    const tableData = ref([])

    onMounted(async () => {
        const response = await api.get('/categorias')
        tableData.value = response.data
    })

    const handleEdit = (row: any) => {
        router.push({ name: 'categorias.editar', params: { id: row.id } })
    }

    const handleDelete = async (row: any) => {
        
        loading.value = true

        let response = await api.delete(`/categorias/${row.id}`)
        
        if (response.status === 200) {
            
            ElNotification({
                title: 'Success',
                message: 'O item foi excluído com sucesso!',
                type: 'success',
            })

            tableData.value = tableData.value.filter((item: any) => item.id !== row.id)
        }
        
        loading.value = false
    }

    const goTo = (name: string) => {
        router.push({ name: name })
    }

</script>

<template>

    <el-row align="middle">
        <el-col :span="12">
            <h1>Categorias - Listar</h1>
        </el-col>
        <el-col :span="12" class="text-right">
            <el-button color="#1e3454" @click="goTo('categorias.cadastrar')">Cadastrar</el-button>
        </el-col>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%" empty-text="Nenhum item para listar">
        <el-table-column prop="id" label="Código" width="100" align="center" />
        <el-table-column prop="nome" label="Nome" />
        <el-table-column label="Ações" width="180">
            <template #default="{ row }">
                <el-button type="primary" @click="handleEdit(row)">Editar</el-button>
                <el-button type="danger" @click="handleDelete(row)">Excluir</el-button>
            </template> 
        </el-table-column>
    </el-table>
  
</template>


