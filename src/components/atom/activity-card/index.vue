<template>
  <v-card v-if="item !== undefined" width="100%" outlined class="activity-card">
    <div class="card-content pa-6 pointer" @click.stop="$emit('click')">
      <span data-cy="activity-item-title" class="title">
        {{ item.title }}
      </span>
    </div>

    <v-card-actions class="pl-6 pr-4 pb-4">
      <span data-cy="activity-item-date" class="footer-text">
        {{ $helper.formatDate(item.created_at) }}
      </span>
      <v-spacer />
      <v-btn
        data-cy="activity-item-delete-button"
        icon
        color="#888888"
        @click.stop="$emit('delete')"
      >
        <v-icon>$deleteIcon</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ActivityCard",
  props: {
    item: {
      default: () => {
        return undefined;
      }
    }
  }
};
</script>
