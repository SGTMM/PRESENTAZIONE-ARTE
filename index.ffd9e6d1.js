var e,t,n,i,o,r,a,d,w,c,s={left:0,right:0,forward:0,back:0},l=0,h=0,E=!1;window.addEventListener("load",function(){setTimeout(()=>{new GLTFLoader().load("scene (7).glb",function(u){console.log(o=u.scene),E=!0,function(){if(E){window.addEventListener("keydown",b,!1),window.addEventListener("keyup",g,!1),r=new THREE.Scene,(d=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3)).updateProjectionMatrix(),d.position.y+=7,(a=new THREE.WebGLRenderer({antialias:!0,alpha:!0})).setSize(window.innerWidth,window.innerHeight),w=new OrbitControls(d,a.domElement),window.addEventListener("resize",function(){d.aspect=window.innerWidth/window.innerHeight,d.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}),document.body.appendChild(a.domElement),e=new THREE.Clock,i=new THREE.Vector3,n=new THREE.Vector3;var u=new THREE.AmbientLight(16777215,5);r.add(u),r.add(o);let E=new THREE.BoxGeometry(.2,.2,.2),H=new THREE.MeshBasicMaterial({color:65280});c=new THREE.Mesh(E,H),r.add(c),c.position.y=7,function o(){e.getDelta(),d.getWorldDirection(n),h=s.right-s.left,l=s.forward-s.back,i.x=n.x/2.5,i.z=n.z/2.5,t=0,1===l?1===h?t=-Math.PI/4:-1===h&&(t=Math.PI/4):-1===l?t=1===h?-Math.PI/4-Math.PI/2:-1===h?Math.PI/4+Math.PI/2:Math.PI:1===h?t=-Math.PI/2:-1===h&&(t=Math.PI/2),i.applyAxisAngle(new THREE.Vector3(0,1,0),t),(0!==l||0!==h)&&(d.position.x+=i.x,d.position.z+=i.z,c.position.x+=i.x,c.position.z+=i.z),w.target.copy(c.position),k=parseInt(f.GetX()),p=parseInt(f.GetY()),k>=75?(s.right=1,s.left=0):k<=-75?(s.right=0,s.left=1):(s.right=0,s.left=0),p>=75?(s.forward=1,s.back=0):p<=-75?(s.forward=0,s.back=1):(s.forward=0,s.back=0),w.update(),a.render(r,d),requestAnimationFrame(o)}()}}()})},3e3)});var f=new JoyStick("joyDiv",{title:"joystick",internalFillColor:"#00AA00",internalLineWidth:2,internalStrokeColor:"#003300",externalLineWidth:2,externalStrokeColor:"#008000",autoReturnToCenter:!0}),k=0,p=0;function b(e){switch(e.keyCode){case 87:s.forward=1;break;case 83:s.back=1;break;case 65:s.left=1;break;case 68:s.right=1}}function g(e){switch(e.keyCode){case 87:s.forward=0;break;case 83:s.back=0;break;case 65:s.left=0;break;case 68:s.right=0}}
//# sourceMappingURL=index.ffd9e6d1.js.map
