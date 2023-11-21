var moveDirection = { left: 0, right: 0, forward: 0, back: 0 }

var ground;

var player;

var clock;

var rotateQuat, walkDir, directionOffset;

var delta;

var player_collider;

var correctedVector;

var moveX = 0;
var moveZ = 0;

var dir;
var forward_vector;

var model_ready = false

var mouseDown
var aimDown

var camDir;

var mov_vector;

var model;

var scene, renderer, camera, controls;

var toggle = false

var box;

window.addEventListener("load", function () {
    setTimeout(() => {
        load_model();

    }, 3000);
})

var joy = new JoyStick('joyDiv', {
    // The ID of canvas element
    title: 'joystick',
    // Internal color of Stick
    internalFillColor: '#00AA00',
    // Border width of Stick
    internalLineWidth: 2,
    // Border color of Stick
    internalStrokeColor: '#003300',
    // External reference circonference width
    externalLineWidth: 2,
    //External reference circonference color
    externalStrokeColor: '#008000',
    // Sets the behavior of the stick
    autoReturnToCenter: true

});


function load_model() {
    new GLTFLoader().load('scene (7).glb', function (gltf) {
        model = gltf.scene
        console.log(model)
        toggle = true
        wait_models()
    })
}

function wait_models() {
    if (toggle) {
        setupEventHandlers()

        scene = new THREE.Scene()

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.updateProjectionMatrix()
        camera.position.y += 7


        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        controls = new OrbitControls(camera, renderer.domElement);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.body.appendChild(renderer.domElement);

        clock = new THREE.Clock()

        mov_vector = new THREE.Vector3()

        camDir = new THREE.Vector3()

        var ambientLight = new THREE.AmbientLight(0xffffff, 5);
        scene.add(ambientLight);
        scene.add(model)

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        box = new THREE.Mesh(geometry, material);
        scene.add(box);
        box.position.y = 7
        //box.position.z = -1

        update()
    }
}

var prev_x = 0;
var prev_z = 0;

var x = 0;
var z = 0;

function update() {

    delta = clock.getDelta()

    camera.getWorldDirection(camDir)

    //console.log(camDir)

    moveZ = moveDirection.right - moveDirection.left;
    moveX = moveDirection.forward - moveDirection.back;

    mov_vector.x = camDir.x / 2.5
    mov_vector.z = camDir.z / 2.5

    directionOffset = 0

    if (moveX === 1) {
        if (moveZ === 1) {
            directionOffset = -Math.PI / 4
        } else if (moveZ === -1) {
            directionOffset = Math.PI / 4
        }
    } else if (moveX === -1) {
        if (moveZ === 1) {
            directionOffset = -Math.PI / 4 - Math.PI / 2
        } else if (moveZ === -1) {
            directionOffset = Math.PI / 4 + Math.PI / 2
        } else {
            directionOffset = Math.PI
        }
    } else if (moveZ === 1) {
        directionOffset = -Math.PI / 2
    } else if (moveZ === -1) {
        directionOffset = Math.PI / 2
    }

    mov_vector.applyAxisAngle(new THREE.Vector3(0, 1, 0), directionOffset)

    if (moveX !== 0 || moveZ !== 0) {
        camera.position.x += mov_vector.x
        camera.position.z += mov_vector.z
        box.position.x += mov_vector.x
        box.position.z += mov_vector.z
    }

    controls.target.copy(box.position)

    x = parseInt(joy.GetX())
    z = parseInt(joy.GetY())

    if (x >= 75) {
        moveDirection.right = 1
        moveDirection.left = 0
    } else if (x <= -75) {
        moveDirection.right = 0
        moveDirection.left = 1
    } else {
        moveDirection.right = 0
        moveDirection.left = 0

    }

    if (z >= 75) {
        moveDirection.forward = 1
        moveDirection.back = 0
    } else if (z <= -75) {
        moveDirection.forward = 0
        moveDirection.back = 1
    } else {
        moveDirection.forward = 0
        moveDirection.back = 0
    }

    //console.log(isPointInsideBox(camera.position.x, camera.position.z))

    controls.update()
    renderer.render(scene, camera);

    requestAnimationFrame(update)
}

function isPointInsideBox(x, z) {
    // Check if x and z are within the bounding box
    const minX = Math.min(-76.21540612288777, -75.9593510912879, 202.57380081700836, 203.17769907829856);
    const maxX = Math.max(-76.21540612288777, -75.9593510912879, 202.57380081700836, 203.17769907829856);
    const minZ = Math.min(-8.791333228457304, 26.63528778585343, 26.531239999910195, -8.855059994891958);
    const maxZ = Math.max(-8.791333228457304, 26.63528778585343, 26.531239999910195, -8.855059994891958);

    if (x < minX || x > maxX || z < minZ || z > maxZ) {
        // Point is outside the bounding box
        return false;
    }

    // If x and z are within the bounding box, check if the point is inside the convex hull of the vertices
    const insideConvexHull = isPointInsideConvexHull(x, z);

    return insideConvexHull;
}

// Helper function to check if a point is inside the convex hull of the box vertices
function isPointInsideConvexHull(x, z) {
    // Implement your convex hull check algorithm here.
    // This could be done using techniques like the winding number algorithm.
    // For simplicity, let's assume the vertices form a convex quadrilateral.
    // You may need to replace this part with a more robust algorithm for complex polygons.

    // In this example, we assume the vertices are in counter-clockwise order.
    const AB = (-75.9593510912879 - -76.21540612288777) * (z - -8.791333228457304) - (x - -76.21540612288777) * (26.63528778585343 - -8.791333228457304);
    const BC = (202.57380081700836 - -75.9593510912879) * (z - 26.63528778585343) - (x - -75.9593510912879) * (26.531239999910195 - 26.63528778585343);
    const CD = (203.17769907829856 - 202.57380081700836) * (z - 26.531239999910195) - (x - 202.57380081700836) * (-8.855059994891958 - 26.531239999910195);
    const DA = (-76.21540612288777 - 203.17769907829856) * (z - -8.855059994891958) - (x - 203.17769907829856) * (-8.791333228457304 - -8.855059994891958);

    return (AB >= 0 && BC >= 0 && CD >= 0 && DA >= 0) || (AB <= 0 && BC <= 0 && CD <= 0 && DA <= 0);
}

function handleKeyDown(event) {

    let keyCode = event.keyCode;

    //console.log(keyCode)


    switch (keyCode) {
        case 87: //W: FORWARD
            moveDirection.forward = 1
            break;

        case 83: //S: BACK
            moveDirection.back = 1
            break;

        case 65: //A: LEFT
            moveDirection.left = 1
            break;

        case 68: //D: RIGHT
            moveDirection.right = 1
            break;
    }

}

function handleKeyUp(event) {

    let keyCode = event.keyCode;

    switch (keyCode) {
        case 87: //FORWARD
            moveDirection.forward = 0
            break;

        case 83: //BACK
            moveDirection.back = 0
            break;

        case 65: //LEFT
            moveDirection.left = 0
            break;

        case 68: //RIGHT
            moveDirection.right = 0
            break;

    }

}


function windowResized() {
    resizeCanvas3D(windowWidth, windowHeight);
}

function setupEventHandlers() {
    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);
}