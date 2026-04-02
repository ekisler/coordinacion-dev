import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Center,
  Flex,
  Input,
  VStack,
  Text,
  Heading,
  useColorModeValue,
  Spinner,
  IconButton,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { IoSendSharp } from 'react-icons/io5';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { FaStop } from 'react-icons/fa6';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatComponent = () => {
  const { user } = useSelector(state => state.auth);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatHistoryRef = useRef(null);
  const abortControllerRef = useRef(null);

  const bgColor = useColorModeValue('blue.900', 'blue.50');
  const containerBg = useColorModeValue('white', 'gray.800');
  const chatBoxBg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const userMsgColor = useColorModeValue('green.600', 'green.300');
  const aiMsgColor = useColorModeValue('blue.600', 'blue.300');

  const sendBtnBg = useColorModeValue('black', 'white');
  const sendBtnIcon = useColorModeValue('white', 'black');

  const handleSendMessage = async () => {
    if (loading && abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      return;
    }

    if (!message.trim()) return;

    const sessionId = `user-${user?.username}`;
    setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
    setLoading(true);
    setMessage('');

    abortControllerRef.current = new AbortController();

    try {
      const response = await axios.post(
        'https://quarterly-morgan-strike-judy.trycloudflare.com/webhook/c0ebab9f-a6e6-40e5-8671-42a68afc9228/chat',
        {
          chatInput: message,
          sessionId,
          username: user?.username,
        },
        { signal: abortControllerRef.current.signal }
      );

      setChatHistory(prevHistory => [
        ...prevHistory,
        { sender: 'ai', text: response.data?.output },
      ]);
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <>
      <Heading
        size={{ base: 'md', md: 'lg' }}
        color={bgColor}
        textAlign="center"
        mt={4}
        mb={6}
      >
        <Icon as={GiArtificialIntelligence} mr={1} fontSize="0.8em" />
        Teacher Agent
      </Heading>

      <Center width="100%" mb={24}>
        <Box
          width="800px"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          bg={containerBg}
          boxShadow="sm"
        >
          <VStack spacing={4} align="stretch">
            <Box
              ref={chatHistoryRef}
              h="400px"
              overflowY="auto"
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg={chatBoxBg}
            >
              {chatHistory.map((chat, index) => (
                <Box key={index} mb={6}>
                  <Flex
                    align="center"
                    mb={1}
                    justifyContent={
                      chat.sender === 'user' ? 'flex-end' : 'flex-start'
                    }
                  >
                    <Text
                      as="strong"
                      fontSize="sm"
                      color={chat.sender === 'user' ? userMsgColor : aiMsgColor}
                    >
                      {chat.sender === 'user'
                        ? user?.username || 'Usuario'
                        : 'Agente-Teacher'}
                    </Text>
                  </Flex>
                  <Text
                    color={textColor}
                    textAlign={chat.sender === 'user' ? 'right' : 'left'}
                  >
                    {chat.text}
                  </Text>
                </Box>
              ))}

              {loading && (
                <Flex align="center" mt={2}>
                  <Text as="strong" fontSize="sm" color={aiMsgColor} mr={2}>
                    Agente-Teacher
                  </Text>
                  <Spinner size="xs" color="blue.500" />
                </Flex>
              )}
            </Box>

            {/* BARRA DE ENTRADA CON BOTÓN DINÁMICO */}
            <Flex gap={2} align="center">
              <Input
                name="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                bg={useColorModeValue('white', 'gray.700')}
                color={textColor}
                onKeyDown={e =>
                  e.key === 'Enter' && !loading && handleSendMessage()
                }
              />

              <Tooltip
                label={loading ? 'Detener' : 'Enviar'}
                placement="top"
                hasArrow
              >
                <IconButton
                  onClick={handleSendMessage}
                  size="md"
                  isRound
                  bg={loading ? 'red.500' : sendBtnBg}
                  color={loading ? 'white' : sendBtnIcon}
                  _hover={{
                    bg: loading
                      ? 'red.600'
                      : sendBtnBg === 'black'
                        ? 'gray.700'
                        : 'gray.200',
                    transform: 'scale(1.05)',
                  }}
                  icon={
                    loading ? (
                      <Icon as={FaStop} fontSize="12px" />
                    ) : (
                      <Icon as={IoSendSharp} fontSize="16px" ml="2px" />
                    )
                  }
                  aria-label={loading ? 'Detener' : 'Enviar'}
                />
              </Tooltip>
            </Flex>
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default ChatComponent;
