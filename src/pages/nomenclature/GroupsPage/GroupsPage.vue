<template>
  <div class="groups-page">
    <v-data-table
      :cols="data.cols"
      :rows="data.rows"
      :rows-on-table="[25, 40, 50, 75]"
      class="elevation-5"
      style="margin: 10px;"
      numbered
      checkbox
      @checked="setCheckedGroups"
    >
      <template v-slot:title="{ row }">
        <v-icon v-show="!row.edit" :icon="Icons.$bookmark" size="18" color="amber accent-3"/>
        <span v-show="!row.edit" style="margin: 0 5px;">{{ row.title }}</span>
        <v-text-field v-show="row.edit" v-model="row.title" dark/>
      </template>
      <template v-slot:actions="{ row }">
        <v-icon
          :icon="Icons.$pen"
          size="18"
          color="green accent-3"
          clickable
          @click="row.edit = !row.edit"
        />
      </template>
      <template v-slot:toolbar>
        <app-toolbar
          @add-new="showModal = true"
          @delete="deleteCheckedGroups"
        />
      </template>
    </v-data-table>
    <v-modal
      v-model="showModal"
      transition="scale-in"
      overlay
    >
      <v-form v-slot="{validate}">
        <v-card :key="data.rows.length" color="blue darken-4" elevation="14">
          <v-card-title class="white--text">
            Создать группу
          </v-card-title>
          <v-card-content>
            <v-text-field
              v-model="data.group.title"
              label="Назвагие группы"
              :rules="[v => !!v || 'обязательно к заполнению']"
              dark
            />
          </v-card-content>
          <v-card-actions>
            <v-button
              color="success"
              elevation="5"
              @click="createNewGroup(validate)"
            >
              создать
            </v-button>
            <v-button
              label="отмена"
              color="warning"
              elevation="5"
              @click="showModal = false"
              style="margin: 0 10px;"
            />
          </v-card-actions>
        </v-card>
      </v-form>
    </v-modal>
  </div>
</template>

<script lang="ts">
  import { ref, reactive, defineComponent } from 'vue'
  import { useActions } from '@/effects/use-store'

  import { AppToolbar } from '@/components/AppToolbar'
  import { Icons } from '@/services/fa-icons'

  import { TableColumn, Group } from '@/types'

  type Data = {
    group: Group
    checkedGroups: Group[]
    cols: TableColumn[]
    rows: any[]
  }

  export default defineComponent({
    name: 'table-page',
    components: {
      AppToolbar
    },
    async setup() {
      const $store = useStore()

      const showModal = ref(false)

      const data: Data = reactive({
        cols: [
          {
            key: 'title',
            title: 'Название группы',
            resizeable: true,
            sortable: true,
            filterable: true,
            width: 200
          },
          {
            key: 'actions',
            title: '',
          }
        ],
        rows: [],
        checkedGroups: [],
        group: {
          title: ''
        }
      })

      const {
        createGroup,
        fetchGroups,
        deleteGroups
      } = useActions(
        $store, store.Module.DICTIONARY,
        {
          createGroup: action.Types.CREATE_GROUP,
          fetchGroups: action.Types.FETCH_GROUPS,
          deleteGroups: action.Types.DELETE_GROUPS
        }
      )

      await fetchGroups().then(groups => data.rows = groups)

      function createNewGroup(validate) {
        validate().then(() => {
          createGroup({ title: data.group.title })
            .then(({ group }) => {
              data.rows.push(group)
              showModal.value = false
              data.group.title = ''
            })
        })
          .catch(() => false)
      }

      function setCheckedGroups(groupsArray) {
        data.checkedGroups = groupsArray
      }

      function deleteCheckedGroups() {
        if (!data.checkedGroups.length) return

        deleteGroups({ groups: data.checkedGroups })
          .then(({ groups }) => {
            groups.forEach(del => {
              const found = data.rows.findIndex(({ _id }) => _id === del._id)
              found >= 0 && data.rows.splice(found, 1)
            })
            data.checkedGroups = []
          })
      }

      return {
        data,
        showModal,
        Icons,
        deleteCheckedGroups,
        setCheckedGroups,
        createNewGroup
      }
    }
  })
</script>

<style lang="scss">
  @import "GroupsPage";
</style>
