export default (location) => {

    // حدث سحب الشاشة من اليمين الى اليسار 

    let startX, startY;

    document.addEventListener('touchstart', function (event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }, false);

    document.addEventListener('touchend', function (event) {
        event.preventDefault();
        var endX = event.changedTouches[0].clientX;
        var endY = event.changedTouches[0].clientY;

        // calculate the distance and direction of the swipe
        var distanceX = endX - startX;
        var distanceY = endY - startY;
        var threshold = 250; // minimum distance for swipe

        if (Math.abs(distanceX) > threshold && Math.abs(distanceY) < threshold && distanceX < 0) {
            // swipe right to left
            // code to return to previous menu


            window.location.href = './index.js' // location
        }
    }, false);
}