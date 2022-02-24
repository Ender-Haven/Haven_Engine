import { dist } from "./mathLib.js";
class PhysicsClass {
  // A simple ray cast which tests against a single wall.
  ray(x,y,angle,test) {
    var raydata = [];
    raydata[0] = test.a.x;
    raydata[1] = test.a.y;
    raydata[2] = test.b.x;
    raydata[3] = test.b.y;
    
    raydata[4] = x;
    raydata[5] = y;
    raydata[6] = x+Math.sin(angle);
    raydata[7] = y+Math.cos(angle);
    
    raydata[8] = (raydata[0] - raydata[2]) * (raydata[5] - raydata[7]) - (raydata[1] - raydata[3]) * (raydata[4] - raydata[6]);
    if(!raydata[8]){
      return(false);
    }
    raydata[10] = ((raydata[0] - raydata[4]) * (raydata[5] - raydata[7]) - (raydata[1] - raydata[5]) * (raydata[4] - raydata[6])) / raydata[8];
    raydata[11] = -((raydata[0] - raydata[2]) * (raydata[1] - raydata[5]) - (raydata[1] - raydata[3]) * (raydata[0] - raydata[4])) / raydata[8];

    if(raydata[10]<0||raydata[10]>1||raydata[11]<0){
      return(false);
    }
    
    raydata[9]={x:raydata[0] + raydata[10] * (raydata[2] - raydata[0]),y:raydata[1] + raydata[10] * (raydata[3] - raydata[1]),a:angle};
    
    return(raydata[9]);
  };

  // A ray that runs checks for multiple hit cases on differant walls
  loopRay(x,y,angle,test) {
    for(var t=0; t<test.length; t++){
      raydata[4] = x;
      raydata[5] = y;
      raydata[6] = x+Math.sin(angle);
      raydata[7] = y+Math.cos(angle);
      var raydata = [];
      raydata[0] = test.a.x;
      raydata[1] = test.a.y;
      raydata[2] = test.b.x;
      raydata[3] = test.b.y;
      raydata[8] = (raydata[0] - raydata[2]) * (raydata[5] - raydata[7]) - (raydata[1] - raydata[3]) * (raydata[4] - raydata[6]);
      if(!raydata[8]){
        continue;
      }
      raydata[10] = ((raydata[0] - raydata[4]) * (raydata[5] - raydata[7]) - (raydata[1] - raydata[5]) * (raydata[4] - raydata[6])) / raydata[8];
      raydata[11] = -((raydata[0] - raydata[2]) * (raydata[1] - raydata[5]) - (raydata[1] - raydata[3]) * (raydata[0] - raydata[4])) / raydata[8];
      if(raydata[10]<0||raydata[10]>1||raydata[11]<0){
        continue;
      }
      raydata[9]={x:raydata[0] + raydata[10] * (raydata[2] - raydata[0]),y:raydata[1] + raydata[10] * (raydata[3] - raydata[1]),a:angle};
      if(!raydata[12]){
        raydata[12]=raydata[9];
      }
      if(dist(raydata[9].x,raydata[9].y,x,y) < dist(raydata[12].x,raydata[12].y,x,y)){
        raydata[12]=raydata[9];
      }
    }
    if(!raydata[12]){return(false);}
    return(raydata[12]);
  };

  
}

export default PhysicsClass;