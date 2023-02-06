
import { createRouter, createWebHashHistory } from 'vue-router'

import CategoriasLista from './pages/categorias/List.vue'
import CategoriasCadastrar from './pages/categorias/Create.vue'
import CategoriasEditar from './pages/categorias/Edit.vue'
import VeiculosLista from './pages/veiculos/List.vue'
import VeiculosCadastrar from './pages/veiculos/Create.vue'
import VeiculosEditar from './pages/veiculos/Edit.vue'
import BrasilApiMarcas from './pages/brasil-api/Marcas.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/categorias',
            name: 'categorias',
            component: CategoriasLista
        },
        {
            path: '/categorias/cadastrar',
            name: 'categorias.cadastrar',
            component: CategoriasCadastrar
        },
        {
            path: '/categorias/editar/:id',
            name: 'categorias.editar',
            component: CategoriasEditar
        },
        {
            path: '/veiculos',
            name: 'veiculos',
            component: VeiculosLista
        },
        {
            path: '/veiculos/cadastrar',
            name: 'veiculos.cadastrar',
            component: VeiculosCadastrar
        },
        {
            path: '/veiculos/editar/:id',
            name: 'veiculos.editar',
            component: VeiculosEditar
        },
        {
            path: '/brasil-api/marcas',
            name: 'brasilapi.marcas',
            component: BrasilApiMarcas
        }

    ]
})

export default router;
