<script setup lang="ts">
    
</script>

<template>
    <el-container>
        <el-aside width="200px">
            
            <div class="logo">
                <router-link to="/">
                    <img src="/cars2you.png" alt="Cars2Yout">
                </router-link>
            </div>

            <div class="menu">
                <ul>
                    <li>
                        <router-link :to="{ name: 'categorias' }">Categorias</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'veiculos' }">Veículos</router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'brasilapi.marcas' }">Brasil API</router-link>
                    </li>
                </ul>
            </div>

        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>


