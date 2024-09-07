module.exports = {
    "routes": [
      {
        "method": "POST",
        "path": "/certificates/downloadCertificate",
        "handler": "custom.downloadCertificate",
        "config": {
          "policies": []
        }
    },
    // {
    //   "method": "GET",
    //   "path": "/orders/findUserOrders",
    //   "handler": "custom.findUserOrders",
    //   "config": {
    //     "policies": []
    //   }
    // }
    ]
  }