//import utils from '../node_modules/decentraland-ecs-utils/index'
import { placeTeleports } from './modules/teleports'
import { setTriggerAreas } from './modules/elevators'
import { addWearables } from './modules/wearables'
import { placeMuseumPieces } from './modules/museumItems'
import { addScreen } from './modules/video'
import { addBuildings } from './modules/buildings'
import { addFaceUserSystem } from './modules/npcFaceUserSystem'
import { addRobots } from './modules/npcRobotBuilder'
import { addNFTs } from './modules/nftBuilder'
import {
  updateMessageBoards,
  updateMarketData,
  CheckServer,
} from './modules/serverHandler'
import { AmbientSound } from './modules/ambient'

//////// HACK TO LOG POSITIONS

class CameraTrackSystem implements ISystem {
  update() {
    log(Camera.instance.position)
  }
}

engine.addSystem(new CameraTrackSystem())

//// ADD BUILDINGS

addBuildings()

/// ELEVATORS

setTriggerAreas()

///TELEPORTERS

placeTeleports()

/// MUSEUM

placeMuseumPieces()

/// VIDEO SCEREEN

addScreen()

//// WEARABLES

addWearables()

//// ROBOTS
const dummyTarget = new Entity()
dummyTarget.addComponent(new PlaneShape())
dummyTarget.addComponent(new Transform())

addFaceUserSystem(dummyTarget)
addRobots(dummyTarget)

//// NFTS
addNFTs()

//// FETCH CURRENT MESSAGES EN MESSAGE BOARDS
//updateMessageBoards()
// how often to refresh scene, in seconds
const messageRefreshInterval: number = 30
// start system
engine.addSystem(new CheckServer(messageRefreshInterval))

/// FETCH DATA FOR TRADE CENTER
updateMarketData()

//// AMBIENT SOUNDS

let forest1 = new AmbientSound(
  { position: new Vector3(215, 2, 183) },
  'sounds/Forest.mp3',
  0,
  true
)

let forest2 = new AmbientSound(
  { position: new Vector3(127, 2, 110) },
  'sounds/Forest2.mp3',
  0,
  true
)

let thunder = new AmbientSound(
  { position: new Vector3(43, 45, 113) },
  'sounds/thunder.mp3',
  0,
  true,
  0.2
)
