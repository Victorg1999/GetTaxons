<template>
<b-row v-if="show">
    <b-col>
        <b-table
        small
        responsive
        sticky-header
        :items="items"
        head-variant="light"
        :busy="isBusy"
        ref="experimentsTable"
        id="experiments-table"
        show-empty
        :current-page="currentPage"
        :per-page="perPage"
        >
        <template #cell(experiment_accession)="data">
          <a class="no-underline" target="_blank" :href="url+data.value">{{data.value}}</a>
        </template>
        <template #cell(study_accession)="data">
            <a class="no-underline" target="_blank" :href="url+data.value">{{data.value}}</a>
        </template>
      <template #cell(sample_accession)="data">
          <a class="no-underline" target="_blank" :href="url+data.value">{{data.value}}</a>
      </template>
      <template #cell(sample_alias)="data">
          <a class="no-underline" target="_blank" :href="url+data.value">{{data.value}}</a>
      </template>
      <template #cell(run_accession)="data">
          <a class="no-underline" target="_blank" :href="url+data.value">{{data.value}}</a>
      </template>
      <template #cell(tax_id)="data">
          <a class="no-underline" target="_blank" :href="url+'Taxon:'+data.value">{{data.value}}</a>
      </template>
      <template #cell(secondary_sample_accession)="data">
          <a class="no-underline" target="_blank" :href="url+data.value">{{data.value}}</a>
      </template>
         <template #cell(secondary_study_accession)="data">
          <a class="no-underline" target="_blank" :href="url+data.value">{{data.value}}</a>
      </template>
      <template #cell(fastq_ftp)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="'ftp://'+elem">{{elem}}</a>
            </li>
        </ul>
      </template>
      <template #cell(fastq_aspera)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="elem">{{elem}}</a>
            </li>
        </ul>
      </template>
       <template #cell(fastq_galaxy)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="elem">{{elem}}</a>
            </li>
        </ul>
      </template>
      <template #cell(submitted_ftp)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="'ftp://'+elem">{{elem}}</a>
            </li>
        </ul>
      </template>
      <template #cell(submitted_aspera)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="elem">{{elem}}</a>
            </li>
        </ul>
      </template>
       <template #cell(submitted_galaxy)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="elem">{{elem}}</a>
            </li>
        </ul>
      </template>
       <template #cell(sra_ftp)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="'ftp://'+elem">{{elem}}</a>
            </li>
        </ul>
      </template>
      <template #cell(sra_galaxy)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="'ftp://'+elem">{{elem}}</a>
            </li>
        </ul>
      </template>
      <template #cell(cram_index_ftp)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="'ftp://'+elem">{{elem}}</a>
            </li>
        </ul>
      </template>
      <template #cell(cram_index_aspera)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="elem">{{elem}}</a>
            </li>
        </ul>
      </template>
       <template #cell(cram_index_galaxy)="data">
        <ul>
            <li v-for="elem in data.value.split(';')" v-bind:key="elem">
                <a class="no-underline" target="_blank" :href="elem">{{elem}}</a>
            </li>
        </ul>
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
          aria-controls="experiments-table"
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
    name: 'experiments-table',
    props: ['taxonId'],
    watch: {
    taxonId: function() {
      this.getExperiments()
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
        getExperiments(){
            const params = {result:  'read_run', 
            fields: config.experimentsParams, 
            format: 'JSON', query:this.taxonId}
            enaService.getENADataByUrl(params)
            .then(response => {
             this.items = Object.freeze(response.data)
             this.totalRows = this.items.length
             this.$emit('rows-rendered', false)
             this.show=true
            // this.totalRows = items.length
            }).catch((e) => {
                console.error(e)
            })
        }
        // experimentsProvider(_, callback){
        //     // console.log(ctx)
        //     console.log(this.apiUrl)
        //     if(this.apiUrl){
        //     // const offset = (ctx.currentPage - 1) * ctx.perPage
        //     //TODO find another way to pass taxid to provider
        //     const params = {result:  'read_run', 
        //     fields: config.experimentsParams, 
        //     format: 'JSON',query:this.apiUrl}
        //         enaService.getENADataByUrl(params)
        //          .then(response => {
        //             const items = Object.freeze(response.data)
        //             // this.totalRows = items.length
        //             callback(items)
        //         }).catch(()=>{
        //             callback([])
        //         })
        //     } else {
        //         callback([])
        //     }
        //     return null

            
        //         // experimentsService.getExperiments(this.sampleId)
        //         // .then(response => {
        //         //     const items = Object.freeze(response.data)
        //         //     callback(items)
        //         // }).catch(()=>{
        //         //     callback([])
        //         // })
        //         // return null
        // },
    },

    components: {
        },
    mounted(){
        // this.getExperiments()
    }
    }
</script>
<style scoped>
li {
    list-style: none;
}
</style>
