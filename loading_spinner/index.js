
jOmnis.sendEvent = function sendEvent(evType, data, callback) {
    var message = {
        evType: evType
    };
    if (data !== undefined) {
        message.data = (typeof (data) === "string") ? data : JSON.stringify(data);
    }
    if (callback !== undefined) {
        message.callback = callback;
    }
    jOmnis.sendControlEvent(message);
};

jOmnis.callbackObject = {
    omnisOnLoad: function () {
        console.log("OMNIS: onLoad");
        // jOmnis.sendEvent("")
    },
    omnisSetOptions: function(data) {
        console.log(data);


        var backgroundColor = data.backgroundColor || "#FFFFFF";
        console.log(`Colore di sfondo ricevuto: ${backgroundColor}`);
        if ((typeof backgroundColor === "number") || backgroundColor.indexOf("#") === -1) {
            // ^ omnis mi manda l'rgb del colore codificato in decimale, lo trasformo in HEX
            // MA anche il codificato decimale è una stringa!
            backgroundColor = `#${parseInt(backgroundColor).toString(16)}`;
        }
        console.log("Colore di sfondo finale: ", backgroundColor);

        document.body.style = `background-color: ${backgroundColor}`;
        
        var element = document.getElementById("spinner");
        element.style.display = "block";



        var backgroundImage = data.backgroundImage;
        if (backgroundImage) {
            element.style.backgroundImage = `url("./${backgroundImage}")`;
        }

        
        var animationDuration = data.animationDuration;
        if (animationDuration) {
            element.style.animation = `rotating ${animationDuration}s linear infinite`;
        }

    }
}