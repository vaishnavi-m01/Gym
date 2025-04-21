import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';

const variableList = ['{{gymName}}', '{{name}}', '{{admissionNo}}'];

export default function BirthdayTemplate() {
    const [message, setMessage] = useState(
        'Happy Birthday! 🎉 May your day be filled with laughter, joy, and cherished moments with loved ones.\n\n{{gymName}}'
    );

    const defaultMessage = 
  'Happy Birthday! 🎉 May your day be filled with laughter, joy, and cherished moments with loved ones.\n\n{{gymName}}';

    const inputRef = useRef(null);
    const [selection, setSelection] = useState({ start: 0, end: 0 });

    const insertVariable = (variable: any) => {
        const start = selection.start;
        const end = selection.end;
        const newText =
            message.substring(0, start) + variable + message.substring(end);
        setMessage(newText);

        const cursorPos = start + variable.length;
        setSelection({ start: cursorPos, end: cursorPos });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Edit message template</Text>

                <View style={styles.descriptionSection}>
                    <Text style={styles.label}>Description:</Text>
                    <Text style={styles.description}>
                        Message sent to member on their birthday
                    </Text>
                </View>

                <View style={styles.variablesSection}>
                    <Text style={styles.label}>Variables</Text>
                    <Text style={styles.instruction}>
                        Click # to activate the variable picker. Select a variable to add to
                        the text
                    </Text>

                    <View style={styles.variableButtonsContainer}>
                        {variableList.map((variable, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.variableButton}
                                onPress={() => insertVariable(variable)}
                            >
                                <Text style={styles.variableButtonText}>{variable}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TextInput
                    ref={inputRef}
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                    onSelectionChange={({ nativeEvent: { selection } }) =>
                        setSelection(selection)
                    }
                    selection={selection}
                />

                <TouchableOpacity style={styles.tryButton}>
                    <Text style={styles.tryButtonText}>Try this template</Text>
                </TouchableOpacity>

                <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.resetButton} onPress={() => {
                        setMessage(defaultMessage);
                        setSelection({ start: defaultMessage.length, end: defaultMessage.length });
                    }}>
                        <Text style={styles.resetButtonText}>Reset to Default</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
    },
    descriptionSection: {
        marginBottom: 20,
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    variablesSection: {
        marginBottom: 20,
    },
    instruction: {
        fontSize: 13,
        color: '#777',
        marginTop: 4,
        marginBottom: 8,
    },
    variableButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    variableButton: {
        backgroundColor: '#ffa726',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginTop: 8,
    },
    variableButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    textInput: {
        backgroundColor: '#fff',
        minHeight: 150,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    tryButton: {
        backgroundColor: '#eee',
        padding: 12,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 16,
    },
    tryButtonText: {
        fontWeight: '500',
    },
    footerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    resetButton: {
        borderWidth: 1,
        borderColor: '#003366',
        padding: 12,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#003366',
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#003366',
        padding: 12,
        borderRadius: 10,
        flex: 0.48,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
});
