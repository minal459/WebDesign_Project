import * as service from '../services/conversations-services.js';
import { setGetResponse, setErrorResponse, setPostResponse, setPutResponse, setDeleteResponse, setUnauthorizedResponse, setNotFoundResponse} from './response-handler.js';


export const post = async (request, response) => {
  try {
    // Check if the body of the request has the necessary fields
    const { to, isSeller, userId } = request.body;
    if (!to || !isSeller || !userId) {
      return setErrorResponse({ message: "Missing required fields" }, response);
    }

    // Call the service layer to save the conversation
    const saveConversation = await service.save(request);

    // Return the saved conversation as a response
    setPostResponse(saveConversation, response);
  } catch (err) {
    // Handle any errors that occur while saving the conversation
    setErrorResponse(err, response);
  }
};

export const put = async (request,response) => {
    try {
        const updatedConversation = await service.update(request);
        setPutResponse(updatedConversation, response);
        } catch(err){
        setErrorResponse(err, response);
    }
};

export const findSingle = async (request,response) => {
  try {
    const convo = await service.findS(request);
    if (!convo) return setNotFoundResponse(response);
    setGetResponse(convo, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const find = async (request,response) => {
  try {
    const convos = await service.find(request);
    setGetResponse(convos, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};
