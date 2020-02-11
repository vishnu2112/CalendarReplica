<template>
  
  <div > 
  
      <v-card
    color="grey lighten-4"
    flat
    height="50px"
    tile
   
    
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn icon class = "mx-2">
        <v-icon>{{ icons.mdiCalendarMonth}}</v-icon>
      </v-btn>
      <v-toolbar-title>Calendar</v-toolbar-title>

      <v-spacer></v-spacer>

      
       <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        

      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon   v-on="on">
          <v-icon>{{ icons.mdiHelpCircle}}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in itemshelp"
          :key="index"
          v-onclick=""
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>


      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon   v-on="on">
          <v-icon>{{ icons.mdiCogs}}</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in itemsettings"
          :key="index"
          v-onclick=""
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
       <v-avatar color="indigo" size="32" v-on = "on">
        <span class="white--text headline">VP</span>
      </v-avatar>

      

    </v-toolbar>
  </v-card>
 

<v-row >
    <v-col cols = "3" class = "mt=4">
       <v-date-picker v-model="picker"></v-date-picker>
       <v-text-field
            class = "mt-4 mx-4"
            label="Search for people"
            single-line
          ></v-text-field>

       <v-combobox
          v-model="select"
          :items="items"
          label="My Calenders"
          multiple
          class = "mt-5 mx-4"
        ></v-combobox>

        <v-combobox
          v-model="select1"
          :items="items1"
          label="Others Calendars"
          multiple
          class = "mt-5 mx-4"
        ></v-combobox>


    </v-col>
    <v-col cols = "9">
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn color="primary" dark @click.stop="dialog = true">
            Create
          </v-btn>
          <v-btn outlined class="ml-4" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn outlined v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDate" max-width="500">
        <v-card>
          <v-container>
            <v-form @submit.prevent="addEvent">
              <v-text-field v-model="name" type="text" label="event name (required)"></v-text-field>
              <v-text-field v-model="details" type="text" label="detail"></v-text-field>
              <v-text-field v-model="start" type="date" label="start (required)"></v-text-field>
              <v-text-field v-model="end" type="date" label="end (required)"></v-text-field>
              <v-text-field v-model="color" type="color" label="color (click to open color menu)"></v-text-field>
              <v-btn type="submit" color="primary" class="mr-4" @click.stop="dialog = false">
                create event
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>

<v-sheet height="600">
  <v-calendar
  ref="calendar"
  v-model="focus"
  color="primary"
  :events="events"
  :event-color="getEventColor"
  :event-margin-bottom="3"
  :now="today"
  :type="type"
  @click:event="showEvent"
  @click:more="viewDay"
  @click:date="setDialogDate"
  @change="updateRange"
  ></v-calendar>
  <v-menu
  v-model="selectedOpen"
  :close-on-content-click="false"
  :activator="selectedElement"
  full-width
  offset-x
  >
  <v-card color="grey lighten-4" :width="350" flat>
    <v-toolbar :color="selectedEvent.color" dark>
      <v-btn @click="deleteEvent(selectedEvent.id)" icon>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>

    <v-card-text>
      <form v-if="currentlyEditing !== selectedEvent.id">
        {{ selectedEvent.details }}
      </form>
      <form v-else>
        <textarea-autosize
        v-model="selectedEvent.details"
        type="text"
        style="width: 100%"
        :min-height="100"
        placeholder="add note">
      </textarea-autosize>
    </form>
  </v-card-text>

  <v-card-actions>
    <v-btn text color="secondary" @click="selectedOpen = false">
      close
    </v-btn>
    <v-btn v-if="currentlyEditing !== selectedEvent.id" text @click.prevent="editEvent(selectedEvent)">
      edit
    </v-btn>
    <v-btn text v-else type="submit" @click.prevent="updateEvent(selectedEvent)">
      Save
    </v-btn>
  </v-card-actions>
</v-card>
</v-menu>
</v-sheet>
</v-col>
</v-row>
</div>
</template>

<script>
import { db } from '@/main'
import {
    mdiCalendarMonth,
    mdiHelpCircle,
    mdiCogs,
  } from '@mdi/js'
export default {
  data: () => ({
    select: [ ],
    items: [
          'Vishnu Priya',
          'Contacts',
          'Remainders',
          'Tasks',
        ],
    select1: [ ],
    items1: ['Holidays in India'],
    icons: {
       mdiCalendarMonth,
       mdiHelpCircle,
       mdiCogs,
      },
    itemshelp: [
        { title: 'Help' },
        { title: 'Training' },
        { title: 'Updates' },
        { title: 'Send feedback' },
      ],
    itemsettings: [
        { title: 'Settings' },
        { title: 'Bin' },
        { title: 'Density & Color' },
        { title: 'Print' },
        { title: 'Get add ons'},
      ],
    today: new Date().toISOString().substr(0, 10),
    focus: new Date().toISOString().substr(0, 10),
    picker: new Date().toISOString().substr(0, 10),
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    name: null,
    details: null,
    start: null,
    end: null,
    color: '#1976D2', // default event color
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    dialog: false,
    dialogDate: false
  }),
  mounted () {
    this.getEvents()
  },
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }
      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth
      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear
      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)
      switch (this.type) {
        case 'month':
        return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
        return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
        return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    }
  },
  methods: {
    async getEvents () {
      let snapshot = await db.collection('calEvent').get()
      const events = []
      snapshot.forEach(doc => {
        let appData = doc.data()
        appData.id = doc.id
        events.push(appData)
      })
      this.events = events
    },
    setDialogDate( { date }) {
      this.dialogDate = true
      this.focus = date
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async addEvent () {
      if (this.name && this.start && this.end) {
        await db.collection("calEvent").add({
          name: this.name,
          details: this.details,
          start: this.start,
          end: this.end,
          color: this.color
        })
        this.getEvents()
        this.name = '',
        this.details = '',
        this.start = '',
        this.end = '',
        this.color = ''
      } else {
        alert('You must enter event name, start, and end time')
      }
    },
    editEvent (ev) {
      this.currentlyEditing = ev.id
    },
    async updateEvent (ev) {
      await db.collection('calEvent').doc(this.currentlyEditing).update({
        details: ev.details
      })
      this.selectedOpen = false,
      this.currentlyEditing = null
    },
    async deleteEvent (ev) {
      await db.collection("calEvent").doc(ev).delete()
      this.selectedOpen = false,
      this.getEvents()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      this.start = start
      this.end = end
    },
    nth (d) {
      return d > 3 && d < 21
      ? 'th'
      : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    }
  }
}
</script>