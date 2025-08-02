import { Channel } from "../schema/channel.js";
import { crudRepository } from "./crudRepository.js";

const channelRepo={
    ...crudRepository(Channel)
}

export default channelRepo