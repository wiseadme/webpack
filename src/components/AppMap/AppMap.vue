<template>
  <div id="map" ref="mapRef"></div>
</template>

<script lang="ts">
  import { onMounted, ref, defineComponent } from 'vue'
  import mapStyleConfig from '@/schemes/map-style.json'

  export default defineComponent({
    name: 'AppMap',

    props: {
      order: {
        type: Object
      }
    },

    setup(props) {
      let map: any = null

      const mapRef = ref(null)

      const LatLng = google.maps.LatLng

      const start = props.order!.address[0].location

      const finish = props.order!.address[props.order!.address.length - 1].location

      const directionService = new google.maps.DirectionsService

      const directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: '#2a77f5',
          strokeWeight: 3,
        }
      })

      const markers: any[] = []

      const center = {
        lat: 55.7522,
        lng: 37.6156
      }

      function initMap() {
        map = new google.maps.Map(mapRef.value!, {
          center,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom: 11,
        })
        map.setOptions({ styles: mapStyleConfig })
      }

      function setMarkerOnMap(it, ind = null) {
        const { lat, lng } = it.location

        const isStart = lat === start.lat && lng === start.lng
        const position = new LatLng(lat, lng)

        const marker = new google.maps.Marker({
          position,
          icon: setMarker(isStart ? 'red' : 'green', ind || ''),
        })

        markers.push({ position })
        marker.setAnimation(google.maps.Animation.DROP)
        marker.setMap(map)

        setInfoWindow(marker, it.line)
      }

      function setInfoWindow(marker, content) {
        const popup = new google.maps.InfoWindow({ content })

        google.maps.event.addListener(marker, 'mouseover', () => {
          popup.open(map, marker)
        })

        google.maps.event.addListener(marker, 'mouseout', () => {
          popup.close()
        })
      }

      function setMarker(color, ind) {
        return `${ process.env.MAP_MARKER }${ color }${ ind }.png`
      }

      function setDirectionRequest() {

        return {
          origin: new LatLng(+start.lat, +start.lng),
          destination: new LatLng(+finish.lat, +finish.lng),
          waypoints: setWaypoints(),
          optimizeWaypoints: true,
          travelMode: (google.maps as any).DirectionsTravelMode.DRIVING
        }
      }

      function setWaypoints() {

        return props.order!.address.reduce((acc, it, i, arr) => {

          setMarkerOnMap(it, i + 1)

          if (i > 0 && i < arr.length - 1) {
            const way: any = {}

            const { lat, lng } = it.location
            way.location = { lat: +lat, lng: +lng }
            way.stopover = true
            acc.push(way)
          }

          return acc
        }, [])
      }


      onMounted(() => {
        initMap()

        const directionRequest = setDirectionRequest()

        directionsDisplay.setOptions({ suppressMarkers: true })

        directionsDisplay.setMap(map)

        directionService.route(
          directionRequest,
          (res, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(res)
            }
          }
        )

        directionsDisplay.setMap(map)
      })

      return {
        mapRef
      }
    }
  })
</script>

<style lang="scss">
  #map {
    width: 100%;
    height: calc(100vh - 50px);
  }
</style>
