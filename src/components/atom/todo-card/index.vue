<template>
  <v-card
    v-if="item !== undefined"
    elevation="1"
    width="100%"
    class="todo-card d-flex flex-row align-center"
  >
    <v-checkbox
      data-cy="todo-item-checkbox"
      v-model="item.is_checked"
      color="#16ABF8"
      class="mt-1 pt-0 mr-4"
      hide-details
      @change="(e) => $emit('onActiveChange', e)"
    />
    <span
      data-cy="todo-item-title"
      class="priority-dot title mr-4"
      :class="item.priority"
    >
      {{ item.title }}
    </span>
    <v-btn data-cy="todo-item-edit-button" icon @click="$emit('edit')">
      <v-icon size="16">$editActivity</v-icon>
    </v-btn>
    <v-spacer />
    <v-btn data-cy="todo-item-delete-button" icon @click.stop="$emit('delete')">
      <v-icon>$deleteIcon</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "TodoCard",
  props: {
    item: {
      default: () => {
        return undefined;
      }
    }
  }
};
</script>
