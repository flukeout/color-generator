var baseHexes = [
"#E08071",
"#F58E5E",
"#FAAF63",
"#FFDA70",
"#A1D085",
"#6AC4A8",
"#80BAE5",
"#5381B9",
"#5E6BA1",
"#9B6D96",
"#F38794"
];

var base = "#5180BB";
var rgb = [];
var original = base;

var hex = (original+'').replace(/#/, '');

for (var i = 0; i < 6; i+=2) {
  rgb.push(parseInt(hex.substr(i,2),16));
}

var baseHsl = rgb2hsl(rgb);

var modifier = {
  "darken" : {
    "hue" : 0,
    "saturation" : 0,
    "lightness" : -15
  },
  "lighten" : {
    "hue" : 0,
    "saturation" : 0,
    "lightness" : 15
  }
}


$(document).ready(function(){
  $(".control-panel .swatch.primary").css("background",base);

  $(".modifier").on("click",".less,.more",function(){
    var direction = $(this).closest(".modifier").attr("type");
    var attribute = $(this).closest(".chunk").attr("type");
    if($(this).hasClass("more")){
      modifier[direction][attribute] = parseInt(modifier[direction][attribute])  + 1;
    } else {
      modifier[direction][attribute] = parseInt(modifier[direction][attribute])  - 1;
    }

    updateControl();
  buildSamples();
  });

  updateControl();
  buildSamples();

});

function buildSamples(){
  $(".samples .sample").remove();

  for(var i = 0; i < baseHexes.length; i++) {
    var sample = $("<div class='sample'><div class='dark'></div><div class='base'></div><div class='light'></div></div>");
    sample.find(".base").css("background",baseHexes[i]);

    var thisBase = hexToHsl(baseHexes[i]);
    //
    var darkHsl = {
      "hue" : thisBase["hue"] + modifier["darken"]["hue"],
      "saturation" : thisBase["saturation"] + modifier["darken"]["saturation"],
      "lightness" : thisBase["lightness"] + modifier["darken"]["lightness"]
    }

    var lightHsl = {
      "hue" : thisBase["hue"] + modifier["lighten"]["hue"],
      "saturation" : thisBase["saturation"] + modifier["lighten"]["saturation"],
      "lightness" : thisBase["lightness"] + modifier["lighten"]["lightness"]
    }


    sample.find(".dark").css("background",hslToCSS(darkHsl));
    sample.find(".light").css("background",hslToCSS(lightHsl));

    $(".samples").append(sample);

  }
}

function hexToHsl(blam){

  var hex = (blam+'').replace(/#/, '');
  var rgb = [];
  for (var i = 0; i < 6; i+=2) {
    rgb.push(parseInt(hex.substr(i,2),16));
  }

  return rgb2hsl(rgb);
}


function hslToCSS(hsl){
  return "hsl(" + hsl["hue"] + "," + hsl["saturation"] + "%," +  hsl["lightness"] + "%)";
};


function updateControl() {

  var darkHsl = {
    "hue" : baseHsl["hue"] + modifier["darken"]["hue"],
    "saturation" : baseHsl["saturation"] + modifier["darken"]["saturation"],
    "lightness" : baseHsl["lightness"] + modifier["darken"]["lightness"]
  }

  var lightHsl = {
    "hue" : baseHsl["hue"] + modifier["lighten"]["hue"],
    "saturation" : baseHsl["saturation"] + modifier["lighten"]["saturation"],
    "lightness" : baseHsl["lightness"] + modifier["lighten"]["lightness"]
  }

  $(".modifier[type=darken] [type=hue] .value").text(modifier["darken"]["hue"]);
  $(".modifier[type=darken] [type=saturation] .value").text(modifier["darken"]["saturation"] + "%");
  $(".modifier[type=darken] [type=lightness] .value").text(modifier["darken"]["lightness"] + "%");

  $(".modifier[type=lighten] [type=hue] .value").text(modifier["lighten"]["hue"]);
  $(".modifier[type=lighten] [type=saturation] .value").text(modifier["lighten"]["saturation"] + "%");
  $(".modifier[type=lighten] [type=lightness] .value").text(modifier["lighten"]["lightness"] + "%");


  $(".control-panel .swatch.dark").css("background", hslToCSS(darkHsl));
  $(".control-panel .swatch.light").css("background", hslToCSS(lightHsl));
}





// Taken from https://gmigdos.wordpress.com/2011/01/13/javascript-convert-rgb-values-to-hsl/
function rgb2hsl(rgbArr){
  console.log(rgbArr);
  var r1 = rgbArr[0] / 255;
  var g1 = rgbArr[1] / 255;
  var b1 = rgbArr[2] / 255;

  var maxColor = Math.max(r1,g1,b1);
  var minColor = Math.min(r1,g1,b1);
  //Calculate L:
  var L = (maxColor + minColor) / 2 ;
  var S = 0;
  var H = 0;
  if(maxColor != minColor){
    //Calculate S:
    if(L < 0.5){
        S = (maxColor - minColor) / (maxColor + minColor);
    }else{
        S = (maxColor - minColor) / (2.0 - maxColor - minColor);
    }
    //Calculate H:
    if(r1 == maxColor){
        H = (g1-b1) / (maxColor - minColor);
    }else if(g1 == maxColor){
        H = 2.0 + (b1 - r1) / (maxColor - minColor);
    }else{
        H = 4.0 + (r1 - g1) / (maxColor - minColor);
    }
  }

  L = L * 100;
  S = S * 100;
  H = H * 60;
  if(H<0){
      H += 360;
  }

  var result = {
     "hue" : H,
     "saturation" : S,
     "lightness" : L
   }

 return result;

}