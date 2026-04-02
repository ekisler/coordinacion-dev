// SubjectTabs.js
import { Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const SubjectTabs = ({ plannings, handleEdit }) => {
  const subjects = plannings.reduce((acc, plan) => {
    plan.subjects.forEach(subject => {
      if (!acc[subject.subject]) {
        acc[subject.subject] = [];
      }
      acc[subject.subject].push(plan);
    });
    return acc;
  }, {});

  return (
    <Tabs variant="enclosed" isLazy>
      <TabList>
        {Object.keys(subjects).map(subject => (
          <Tab key={subject}>{subject}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {Object.keys(subjects).map(subject => (
          <TabPanel key={subject}>
            <Heading size="md" mb={2}>{subject}</Heading>
            {subjects[subject].map(plan => (
              <Box key={plan._id} mb={8} p={4} borderWidth="1px" borderRadius="lg">
                {plan.subjects
                  .filter(s => s.subject === subject) 
                  .map((subj, idx) => (
                    <Box key={idx}>
                        <Heading size="sm" mb={2}>Grado: {plan.grade}°</Heading>
                      <Heading size="sm">{subj.title}</Heading> 
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th width="30%">Concepto</Th>
                            <Th width="30%">Procedimiento</Th>
                            <Th width="40%">Actitudinal</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {subj.topics.map(topic => (
                            <Tr key={topic._id}>
                              <Td>{topic.Concepto}</Td>
                              <Td>{topic.Procedimiento}</Td>
                              <Td>{topic.Actitudinal}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  ))}
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="yellow"
                  mt={4}
                  onClick={() => handleEdit(plan)}
                />
              </Box>
            ))}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};


export default SubjectTabs;
