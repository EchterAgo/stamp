<template>
  <q-card class="q-px-sm q-pb-md dialog-medium">
    <!-- New contact dialog -->
    <q-dialog v-model="newContactOpen">
      <new-contact-dialog />
    </q-dialog>

    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">
        Contacts
      </div>
      <q-space />
      <q-btn
        flat
        round
        icon="add"
        color="primary"
        @click="newContactOpen=true"
      />
    </q-card-section>

    <q-card-section class="q-pb-none">
      <q-input
        class="text-bold text-h6"
        v-model="search"
        filled
        dense
        placeholder="Search..."
        ref="contactSearch"
      />
    </q-card-section>
    <q-card-section class="q-pb-none">
      <contact-list
        :contacts="searchContacts(search)"
        :contact-click="contactClick"
      />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        flat
        label="Close"
        color="primary"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import ContactList from '../contacts/ContactList.vue'
import NewContactDialog from '../dialogs/NewContactDialog.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    contactClick: {
      type: Function,
      required: true
    }
  },
  components: {
    ContactList,
    NewContactDialog
  },
  methods: {
    searchContacts (searchPrefix) {
      const sortedContacts = Object.entries(this.contacts).sort((e1, e2) => {
        return e1[0] < e2[0]
      })

      const result = {}
      for (const [address, contact] of sortedContacts) {
        const lowerSearch = searchPrefix.toLowerCase()
        if (contact.profile.name.toLowerCase().includes(lowerSearch) || address.toLowerCase().includes(lowerSearch)) {
          result[address] = contact
        }
      }

      return result
    }
  },
  computed: {
    ...mapGetters({
      contacts: 'contacts/getContacts'
    })
  },
  data () {
    return {
      search: '',
      newContactOpen: false
    }
  },
  mounted () {
    this.$refs.contactSearch.$el.focus()
  }
}
</script>
