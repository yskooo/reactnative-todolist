import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
         Text,
         View, 
         KeyboardAvoidingView, 
         TextInput, 
         TouchableOpacity,
          Keyboard, 
          ScrollView, 
          Platform} from 'react-native';

import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
    {/* Added this scroll view to enable scrolling when list gets longer than the page */}
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1
      }}  
      keyboardShouldPersistTaps='handled'
    >

      {/* Today's Tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>
          Today's Tasks
        </Text>
        {/* Tasks List */}
        {taskItems.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item}/>
            </TouchableOpacity>
          )
          })
        }
      </View>
    </ScrollView>

    {/* Write a task */}
    {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput 
        style={styles.input} 
        placeholder={'Write a task'}
        value={task}
        onChangeText={text => setTask(text)}
      />
      <TouchableOpacity onPress={() => handleAddTask()}>
       <View style={styles.addWrapper}>
         <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 30,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#55BCF6',
    borderWidth: 1,
  },
  addText: {},
});
