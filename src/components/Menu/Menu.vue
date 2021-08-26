<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <h1>
            <span v-if="collapsed">
                <div>D</div>
                <div>V</div>
            </span>
            <span v-else>menu</span>
        </h1>
        <span class="collapse-icon" :class="{'rotate-180': collapsed}" @click="toggleSidebar">
            <i class="fa fa-angle-double-left" />    
        </span>
    </div>
</template>
<script>
import { collapsed, toggleSidebar, sidebarWidth } from './state'

export default {
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth }
    }
}
</script>

<style>
:root {
  --sidebar-bg-color: #002d5c;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #cc003d;
}
</style>
<style scoped>
.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);
  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>