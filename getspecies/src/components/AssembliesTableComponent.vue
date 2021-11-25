<template>
<b-row v-if="show">
    <b-col>
        <b-table
        small
        responsive
        sticky-header
        :items="items"
        head-variant="light"
        ref="assembliesTable"
        :busy="isBusy"
        show-empty
        id="assemblies-table"
        :current-page="currentPage"
        :per-page="perPage"
        >
      <template #cell(accession)="data">
          <a class="no-underline" target="_blank" :href="url + data.value">{{data.value}}</a>
      </template>
      </b-table>
      <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          aria-controls="assemblies-table"
        ></b-pagination>
      </b-col>
      </b-row>
    </b-col>
</b-row>
</template>

<script>

import config from "../static-config"
import enaService from "../services/ENASearchService"

export default {
    name: 'assemblies-table',
    props: ['taxonId'],
     watch: {
    taxonId: function() {
      this.getAssemblies()
    }
  },
    data() {
        return {
            isBusy: false,
            show:false,
            url: config.ENABrowser,
            items: [],
            currentPage: 1,
            perPage: 5,
            totalRows: 1,
            pageOptions: [5,20,50]
        }
    },
        methods: {
            getAssemblies(){
            const params = {result:  'assembly',
            format: 'JSON', query:this.taxonId}
            enaService.getENADataByUrl(params)
            .then(response => {
             this.items = Object.freeze(response.data)
             console.log(this.items)
             this.totalRows = this.items.length
             this.$emit('rows-rendered', false)
             this.show=true
            }).catch((e) => {
                console.error(e)
            })
            }
    },
    components: {
        },
        mounted(){

        }
    }
</script>
<style>

</style>