module.exports = {
    "routes": [
      {
        "method": "POST",
        "path": "/orders/updatePaymentStatus",
        "handler": "custom.updatePaymentStatus",
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