let config

if (process.env.NODE_ENV === 'production') {
  config = {
    $api_url: 'https://api.skyapps.id',
  }
} else {
  config = {
    $api_url: 'http://localhost:8000',
  }
}

export { config }
