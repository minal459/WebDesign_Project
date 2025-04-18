// Import necessary modules and interfaces
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import moment from "moment";
import "./Messages.scss";

// Interface representing a conversation
interface Conversation {
  id: number;
  buyerId: number;
  sellerId: number;
  readByBuyer: boolean;
  readBySeller: boolean;
  lastMessage: string;
  updatedAt: string;
}

// Interface representing user display names
interface UserDisplayNames {
  buyerName: string;
  sellerName: string;
}

// Functional component representing the Messages page
const Messages: React.FC = () => {
  // Get the current user information from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Initialize the react-query queryClient
  const queryClient = useQueryClient();

  // State to store user display names
  const [userDisplayNames, setUserDisplayNames] = useState<UserDisplayNames[]>([]);

  // Use the react-query useQuery hook to fetch conversation data
  const { isLoading, error, data } = useQuery<Conversation[], Error>({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get("/conversations").then((res) => {
        return res.data;
      }),
  });

  // Use the react-query useMutation hook to handle marking conversations as read
  const mutation = useMutation<void, unknown, number>({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      // Invalidate the queries related to conversations after successful update
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  // Function to handle marking a conversation as read
  const handleRead = (id: number) => {
    mutation.mutate(id);
  };

  const createConversation = async (sellerId: string | number) => {
    // Check if the userId and sellerId are available
    if (!currentUser || !sellerId) {
      console.error("Invalid user or seller ID");
      return;
    }
  
    try {
      // Sending the POST request to create the conversation
      const response = await newRequest.post("/conversations", {
        userId: currentUser.id,
        to: sellerId,  // The ID of the seller
        isSeller: currentUser.isSeller,  // Check if the current user is the seller
      });
  
      // Log the response from the backend
      console.log("New conversation created:", response.data);
  
      // Optionally, you can also redirect the user to the message thread if the conversation was successfully created
      // For example, use `useHistory` or `useNavigate` from react-router to navigate to the conversation.
    } catch (err) {
      console.error("Error creating conversation:", err);
    }
  };
  


  // Fetch buyer and seller names based on IDs
  useEffect(() => {
    const fetchUserDisplayNames = async () => {
      console.log("inside useEffect", data);
      const names = await Promise.all(
        data?.map(async (conversation) => {
          const buyerResponse = await newRequest.get(`/users/${conversation.buyerId}`);
          const sellerResponse = await newRequest.get(`/users/${conversation.sellerId}`);
          console.log('Seller Name:', sellerResponse.data.name); // Log the name specifically

          return {
            buyerName: buyerResponse.data.name,
            sellerName: sellerResponse.data.name,
          };
        }) || []
      );

      setUserDisplayNames(names);
    };

    // Fetch user display names only when conversation data is available
    if (data) {
      fetchUserDisplayNames();
    }
  }, [data]);

   // Check if a conversation exists, and if not, create one
   const checkAndCreateConversation = (sellerId: string | number) => {
    // Check if the conversation exists first
    const existingConversation = data?.find(
      (conversation) =>
        (conversation.sellerId === sellerId && conversation.buyerId === currentUser.id) ||
        (conversation.buyerId === sellerId && conversation.sellerId === currentUser.id)
    );

    if (!existingConversation) {
      // If the conversation doesn't exist, create a new one
      createConversation(sellerId);
    }
  };

  // Render the Messages component
  return (
    <div className="messages">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error loading messages</div>
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr className="messageHeader">
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((c, index) => (
                <tr
                  className={
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>{currentUser.isSeller ? userDisplayNames[index]?.buyerName : userDisplayNames[index]?.sellerName}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td className="date">{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button className="read" onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Export the Messages component as the default export
export default Messages;




