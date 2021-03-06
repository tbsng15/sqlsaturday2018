﻿
$('#processButton').click(function () {



    var MapsAccountKey = "wFEIEg9VEJsEeLHV-ieTFVJ2_nbiermiUCvx7gR-jws";
    var currentMap = new atlas.Map("map", {
        "subscription-key": MapsAccountKey
    });

    currentMap.events.add("load", function () {
        var searchLayerName = "search-results";
        currentMap.addPins([], {
            name: searchLayerName,
            cluster: false,
            icon: "pin-round-darkblue"
        });

        var text = $('#dataInput').val();
        var myObj = $.parseJSON(text).coordinates;


        var pins = [];
        myObj.forEach(function (value) {
            var poiposition = [value.position.lon, value.position.lat];
            var currentPin = new atlas.data.Feature(new atlas.data.Point(poiposition), {
                name: value.poi.name,
                address: value.address.freeformAddress,
                position: poiposition[0] + "," + poiposition[1]
            });
            pins.push(currentPin);
        });

        currentMap.addPins(pins, {
            name: searchLayerName
        });


        var popup = new atlas.Popup();
        currentMap.addEventListener("mouseover", searchLayerName, (e) => {
            var popupContentElement = document.createElement("div");
            popupContentElement.style.padding = "5px";

            var popupNameElement = document.createElement("div");
            popupNameElement.innerText = e.features[0].properties.name;
            popupContentElement.appendChild(popupNameElement);

            var popupAddressElement = document.createElement("div");
            popupAddressElement.innerText = e.features[0].properties.address;
            popupContentElement.appendChild(popupAddressElement);

            var popupPositionElement = document.createElement("div");
            popupPositionElement.innerText = e.features[0].properties.position;
            popupContentElement.appendChild(popupPositionElement);

            popup.setPopupOptions({
                position: e.features[0].geometry.coordinates,
                content: popupContentElement
            });

            popup.open(currentMap);
        });

    });
});
