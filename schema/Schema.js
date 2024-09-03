const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Message {
    message: String
    sendBy: String
    receiveBy: String
    createdAt: String
    dateStamp: String
    chatRoomId: String
  }

  type ChatRoom {
    chatRoomId: String
    messages: [Message]
    senderUid: String
    receiverUid: String
    lastMessage: String
    lastMessageTime: String
    lastMessageSenderUid: String
    lastMessageRead: Boolean
  }

  type User {
    email: String
    displayName: String
    photoUrl: String
    status: String
    uid: String
  }

  type Query {
    messages(chatRoomId: String!): [Message]
    users(ids: [String!]!): [User]
    user(uid: String!): User
    allUsers: [User]
    chatrooms(uid: String!): [ChatRoom]
  }

  type Mutation {
    createChatRoom(
      senderUid: String!
      receiverUid: String!
      chatRoomId: String!
    ): ChatRoom
    sendMessage(
      chatRoomId: String!
      sendBy: String!
      receiveBy: String!
      message: String!
      dateStamp: String!
    ): ChatRoom
    updateUser(
      uid: String!
      email: String
      displayName: String
      photoUrl: String
      status: String
    ): User
    registerUser(
      email: String!
      password: String!
      displayName: String!
      photoUrl: String
      status: String
      uid: String!
    ): User
    deleteChatRoom(chatRoomId: String!): Boolean
  }
`;

module.exports = typeDefs;
