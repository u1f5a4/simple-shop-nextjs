module.exports = {
  async redirects() {
    return [
      {
        source: '/painting',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
