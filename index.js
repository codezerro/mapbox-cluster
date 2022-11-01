(async () => {
    //import dom
    const allTypeList = document.getElementById("school-lists");
    // variables
    const colors = ["#ef994d", "#2e994d", "#f27265", "#51bbd6", "#f28cb1"];
    const private = ["==", ["get", "TYPE_SPECIFIC"], "PRIVATE"];
    const archdiocese = ["==", ["get", "TYPE_SPECIFIC"], "ARCHDIOCESE"];
    const district = ["==", ["get", "TYPE_SPECIFIC"], "DISTRICT"];
    const charter = ["==", ["get", "TYPE_SPECIFIC"], "CHARTER"];
    const contracted = ["==", ["get", "TYPE_SPECIFIC"], "CONTRACTED"];

    // func

    // code for creating an SVG donut chart from feature properties
    function customClusterMarker(props) {
        const counts = [
            props.private,
            props.archdiocese,
            props.district,
            props.charter,
            props.contracted,
        ];

        let total = 0;
        for (const count of counts) {
            total += count;
        }

        console.log(total);

        let img = document.createElement("img");
        let html = document.createElement("div");
        img.classList.add("marker-image");
        // console.log(props);

        if (props.private > 0) {
            html.classList.add("marker-cluster-group");
            html.style.setProperty("--school-cluster-color", colors[0]);
            img.src = "./assets/dollar-icon.svg";
        } else if (props.archdiocese > 0) {
            html.classList.add("marker-cluster-group");
            html.style.setProperty("--school-cluster-color", colors[1]);
            img.src = "./assets/archdiocese-icon.svg";
        } else if (props.district > 0) {
            html.classList.add("marker-cluster-group");
            html.style.setProperty("--school-cluster-color", colors[2]);
            img.src = "./assets/school-icon.svg";
        } else if (props.charter > 0) {
            html.classList.add("marker-cluster-group");
            html.style.setProperty("--school-cluster-color", colors[3]);
            img.src = "./assets/charter-icon.svg";
        } else if (props.contracted > 0) {
            html.classList.add("marker-cluster-group");
            html.style.setProperty("--school-cluster-color", colors[4]);
            img.src = "./assets/contact-icon.svg";
        }
        for (let i = 0; i < counts.length; i++) {
            html.setAttribute("data-total", total);
        }

        html.appendChild(img);

        const el = document.createElement("div");
        el.appendChild(html);
        return el.firstChild;
    }

    // initalize map
    const map = new mapboxgl.Map({
        accessToken:
            "pk.eyJ1IjoibmFubWFnYXppbmUiLCJhIjoiY2thaDlhOGwwMGUxbDJwb2UzdzlwOG9qbyJ9.SClZTOJvnVXr9pKeswp9Wg",
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 5,
        center: [-75.1634134086327, 40.0595120027579],
    });

    map.addControl(new mapboxgl.NavigationControl());

    const res = await fetch("./Schools.geojson");
    const data = await res.json();

    // side bar indication
    const schoolTypes = {};
    data.features.forEach((school) => {
        if (schoolTypes[school.properties.TYPE_SPECIFIC] === undefined) {
            schoolTypes[school.properties.TYPE_SPECIFIC] = 1;
        } else schoolTypes[school.properties.TYPE_SPECIFIC] += 1;
    });

    //

    Object.entries(schoolTypes).forEach(([key, value], i) => {
        const list = document.createElement("li");
        const span = document.createElement("span");

        if (key === "PRIVATE") {
            list.textContent = `${key}`;
            span.textContent = `${value}`;
            list.style.setProperty("--school-color", colors[i]);
            list.style.setProperty(
                "--school-color-url",
                `url('./assets/dollar-icon.svg')`
            );
        } else if (key === "ARCHDIOCESE") {
            list.textContent = `${key}`;
            span.textContent = `${value}`;
            list.style.setProperty("--school-color", colors[i]);
            list.style.setProperty(
                "--school-icon-url",
                `url('./assets/archdiocese-icon.svg')`
            );
        } else if (key === "DISTRICT") {
            list.textContent = `${key}`;
            span.textContent = `${value}`;
            list.style.setProperty("--school-color", colors[i]);
            list.style.setProperty(
                "--school-icon-url",
                `url('./assets/school-icon.svg')`
            );
        } else if (key === "CHARTER") {
            list.textContent = `${key}`;
            span.textContent = `${value}`;
            list.style.setProperty("--school-color", colors[i]);
            list.style.setProperty(
                "--school-icon-url",
                `url('./assets/charter-icon.svg')`
            );
        } else if (key === "CONTRACTED") {
            list.textContent = `${key}`;
            span.textContent = `${value}`;
            list.style.setProperty("--school-color", colors[i]);
            list.style.setProperty(
                "--school-icon-url",
                `url('./assets/contact-icon.svg')`
            );
        }

        list.appendChild(span);

        allTypeList.children[0].appendChild(list);
    });

    // map on load
    map.on("load", () => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        // create map marker
        data.features.forEach((d, index) => {
            const schoolCoord = d.geometry.coordinates;
            const schoolType = d.properties.TYPE_SPECIFIC;
            const div = document.createElement("div");

            if (schoolType === "PRIVATE") {
                div.classList.add("map-marker");
                div.style.setProperty("--school-color", colors[0]);
                div.style.setProperty(
                    "--school-icon",
                    `url('./assets/dollar-icon.svg')`
                );
            } else if (schoolType === "ARCHDIOCESE") {
                div.classList.add("map-marker");
                div.style.setProperty("--school-color", colors[1]);
                div.style.setProperty(
                    "--school-icon",
                    `url('./assets/archdiocese-icon.svg')`
                );
            } else if (schoolType === "DISTRICT") {
                div.classList.add("map-marker");
                div.style.setProperty("--school-color", colors[2]);
                div.style.setProperty(
                    "--school-icon",
                    `url('./assets/school-icon.svg')`
                );
            } else if (schoolType === "CHARTER") {
                div.classList.add("map-marker");
                div.style.setProperty("--school-color", colors[3]);
                div.style.setProperty(
                    "--school-icon",
                    `url('./assets/charter-icon.svg')`
                );
            } else if (schoolType === "CONTRACTED") {
                div.classList.add("map-marker");
                div.style.setProperty("--school-color", colors[4]);
                div.style.setProperty(
                    "--school-icon",
                    `url('./assets/contact-icon.svg')`
                );
            }

            // onclick to fly
            div.onclick = function () {
                map.flyTo({
                    center: schoolCoord,
                    essential: true,
                    zoom: 17,
                    speed: 0.86,
                });
            };

            new mapboxgl.Marker(div).setLngLat(schoolCoord).addTo(map);
        });

        // add a clustered GeoJSON source for a sample set of school
        map.addSource("school-cluster", {
            type: "geojson",
            data: data,
            cluster: true,
            clusterRadius: 10,
            clusterProperties: {
                // keep separate counts for each magnitude category in a cluster
                private: ["+", ["case", private, 1, 0]],
                archdiocese: ["+", ["case", archdiocese, 1, 0]],
                district: ["+", ["case", district, 1, 0]],
                charter: ["+", ["case", charter, 1, 0]],
                contracted: ["+", ["case", contracted, 1, 0]],
            },
        });

        map.addLayer({
            id: "school_count_label",
            type: "symbol",
            source: "school-cluster",
        });

        // objects for caching and keeping track of HTML marker objects (for performance)
        const markers = {};
        let markersOnScreen = {};

        function updateMarkers() {
            const newMarkers = {};
            const features = map.querySourceFeatures("school-cluster");

            // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
            // and add it to the map if it's not there already
            for (const feature of features) {
                // console.log("feature.properties ", feature);

                const coords = feature.geometry.coordinates;
                const props = feature.properties;
                if (!props.cluster) continue;
                const id = props.cluster_id;

                let marker = markers[id];
                if (!marker) {
                    const el = customClusterMarker(props);
                    marker = markers[id] = new mapboxgl.Marker({
                        element: el,
                    }).setLngLat(coords);
                }
                newMarkers[id] = marker;

                if (!markersOnScreen[id]) marker.addTo(map);
            }
            // for every marker we've added previously, remove those that are no longer visible
            for (const id in markersOnScreen) {
                if (!newMarkers[id]) markersOnScreen[id].remove();
            }
            markersOnScreen = newMarkers;
        }

        // after the GeoJSON data is loaded, update markers on the screen on every frame
        map.on("render", () => {
            if (!map.isSourceLoaded("school-cluster")) return;

            updateMarkers();
        });

        //fit bound
        const bounds = new mapboxgl.LngLatBounds(
            data.features[0].geometry.coordinates,
            data.features[0].geometry.coordinates
        );

        for (const d of data.features) {
            bounds.extend(d.geometry.coordinates);
        }

        map.fitBounds(bounds, {
            padding: 250,
        });
    });
})();
