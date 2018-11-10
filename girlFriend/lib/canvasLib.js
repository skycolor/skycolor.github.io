(function($ , window) {
    var snows = [];
    var supportCanvas = function() {
        return (typeof document.createElement("canvas").getContext) == "function";
    };
    function Snow(element, settings) {
        this.settings = settings,this.flakes = [],this.flakeCount = settings.count,
            this.mx = -100,this.my = -100,this.init(element);
    };
    Snow.prototype.init = function(element) {
        this.canvas = element[0], this.ctx = this.canvas.getContext("2d"), this.canvas.width = window.innerWidth, this.canvas.height = window.innerHeight, this.flakes = [];
        for (var i = 0; i < this.flakeCount; i++) {
            var x = Math.floor(Math.random() * this.canvas.width),
                y = Math.floor(Math.random() * this.canvas.height),
                size = Math.floor(100 * Math.random()) % this.settings.size + 2,
                speed = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * size / 10 + .5,
                opacity = .5 * Math.random() + this.settings.opacity;
            this.flakes.push({
                speed: speed,
                velY: speed,
                velX: 0,
                x: x,
                y: y,
                size: size,
                stepSize: Math.random() / 1000,
                step: 0,
                angle: 180,
                opacity: opacity
            })
        }
        var thiz = this;
        $(window).resize(function() {
            thiz.ctx.clearRect(0, 0, thiz.canvas.width, thiz.canvas.height), thiz.canvas.width = window.innerWidth, thiz.canvas.height = window.innerHeight
        });
        if (typeof this.settings.image === "string") {
            this.image = $("<img src='" + this.settings.image + "' style='display: none'>");
        };
        snows.push(this);
    }, Snow.prototype.resetFlake = function(flake) {
        if (0 == this.settings.windPower || 0 == this.settings.windPower)
            flake.x = Math.floor(Math.random() * this.canvas.width), flake.y = 0;
        else if (this.settings.windPower > 0) {
            var xarray = Array(Math.floor(Math.random() * this.canvas.width), 0),
                yarray = Array(0, Math.floor(Math.random() * this.canvas.height)),
                allarray = Array(xarray, yarray),
                selected_array = allarray[Math.floor(Math.random() * allarray.length)];
            flake.x = selected_array[0], flake.y = selected_array[1]
        } else {
            var xarray = Array(Math.floor(Math.random() * this.canvas.width), 0),
                yarray = Array(this.canvas.width, Math.floor(Math.random() * this.canvas.height)),
                allarray = Array(xarray, yarray),
                selected_array = allarray[Math.floor(Math.random() * allarray.length)];
            flake.x = selected_array[0], flake.y = selected_array[1]
        }
        flake.size = Math.floor(100 * Math.random()) % this.settings.size + 2,
            flake.speed = Math.floor(100 * Math.random()) % this.settings.speed + Math.random() * flake.size / 10 + .5,
            flake.velY = flake.speed, flake.velX = 0, flake.opacity = .5 * Math.random() + this.settings.opacity
    };
    function starSnow(){
        var render = function() {
            for(var index = 0 , thiz ; thiz = snows[index++];){
                thiz.ctx.clearRect(0, 0, thiz.canvas.width, thiz.canvas.height);
                for (var i = 0; i < thiz.flakeCount; i++) {
                    var flake = thiz.flakes[i];
                    switch (flake.velX *= .98, flake.velY <= flake.speed && (flake.velY = flake.speed), thiz.settings.windPower) {
                        case !1:
                            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                            break;
                        case 0:
                            flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                            break;
                        default:
                            flake.velX += .01 + thiz.settings.windPower / 100
                    }
                    if (flake.y += flake.velY, flake.x += flake.velX, (flake.y >= thiz.canvas.height || flake.y <= 0) && thiz.resetFlake(flake), (flake.x >= thiz.canvas.width || flake.x <= 0) && thiz.resetFlake(flake), 0 == thiz.settings.image) {
                        var grd = thiz.ctx.createRadialGradient(flake.x, flake.y, 0, flake.x, flake.y, flake.size - 1);
                        grd.addColorStop(0, thiz.settings.startColor), grd.addColorStop(1, thiz.settings.endColor), thiz.ctx.fillStyle = grd, thiz.ctx.beginPath(), thiz.ctx.arc(flake.x, flake.y, flake.size, 0, 2 * Math.PI), thiz.ctx.fill()
                    } else
                        thiz.ctx.drawImage(thiz.image[0], flake.x, flake.y, 2 * flake.size, 2 * flake.size)
                }
            }
            window.requestAnimationFrame(render);
        };
        render()
    }
    $.fn.snow = function() {
        var userCanvas = supportCanvas();
        userCanvas && $(this).each(function(i, e) {
            var scope = {};
            $.each(e.attributes, function(index, key) {
                scope[$.camelCase(key.name)] = Number(Number(key.value)) ? Number(key.value) : key.value
            });
            if(scope.image === "false") scope.image = false;
            new Snow($(e), {
                speed: scope.speed || 1,
                size: scope.size || 2,
                count: scope.count || 200,
                opacity: scope.opacity || 1,
                startColor: scope.startColor || "rgba(255,255,255,1)",
                endColor: scope.endColor || "rgba(255,255,255,0)",
                windPower: scope.windPower || 0,
                image: scope.image || !1
            });
        });
        starSnow();
    };
})(Zepto , window);
