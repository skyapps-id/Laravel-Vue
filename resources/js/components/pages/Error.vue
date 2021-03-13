<template>
  <v-app>
    <v-sheet color="transparent" height="100vh">
      <v-row align="center" class="fill-height" no-gutters>
        <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="12" md="6">
          <v-sheet color="primary darken-2" dark height="100vh" width="100%">
            <v-container class="justify-center" fill-height>
              <div class="d-flex align-center flex-column text-center">
                <h1 class="text-xl-h1 text-md-h2 font-weight-bold">
                    HuntStreet
                </h1>
              </div>
            </v-container>
          </v-sheet>
        </v-col>

        <v-col cols="12" lg="6">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" lg="6" md="8" xl="4">
                <h3 class="text-h3 font-weight-bold text-center">
                    404 Not Found
                </h3>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-sheet>
  </v-app>
</template>