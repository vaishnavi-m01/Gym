import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
    TextInput,
} from 'react-native';

const variableList = [
    'memberName',
    'planName',
    'endDate',
    'gymName',
    'startDate',
];

const initialMessage = `Hello {{memberName}},

We regret to inform you that your membership to {{planName}} has expired on {{endDate}} and the due date has passed.

Please renew your membership as soon as possible.

Thank you,
{{gymName}}`;

const EditMessageTemplate = () => {
    const [messagePreview, setMessagePreview] = useState(initialMessage);
    const [modalVisible, setModalVisible] = useState(false);
    const [editText, setEditText] = useState('');

    const handleSelectVariable = () => {
        // Open the modal for editing the whole message
        setEditText(messagePreview);
        setModalVisible(true);
    };

    const saveEditedMessage = () => {
        setMessagePreview(editText);
        setModalVisible(false);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>
                        <Text style={styles.bold}>Template:</Text> Membership expired
                    </Text>
                    <Text style={styles.label}>
                        <Text style={styles.bold}>Description:</Text> The message for membership expiry
                    </Text>
                </View>

                <Text style={styles.variablesTitle}>Variables</Text>
                <Text style={styles.variableNote}>
                    Click # to activate the variable picker. Select a variable to edit the message
                </Text>

                <View style={styles.chipContainer}>
                    {variableList.map((variable, index) => (
                        <TouchableOpacity key={index} style={styles.chip} onPress={handleSelectVariable}>
                            <Text style={styles.chipText}>#{variable}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.previewBox}>
                    <Text style={styles.previewText}>{messagePreview}</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Try this template</Text>
                </TouchableOpacity>

                {/* Modal for editing message */}
                <Modal visible={modalVisible} animationType="slide" transparent>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Message</Text>
                            <TextInput
                                multiline
                                style={styles.input}
                                value={editText}
                                onChangeText={setEditText}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={saveEditedMessage} style={styles.saveBtn}>
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default EditMessageTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
        color: '#fff',
        backgroundColor: '#031956',
        padding: 12,
        borderRadius: 8,
    },
    labelContainer: {
        marginVertical: 12,
    },
    label: {
        fontSize: 16,
        marginVertical: 4,
    },
    bold: {
        fontWeight: '600',
    },
    variablesTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 12,
    },
    variableNote: {
        fontSize: 14,
        marginBottom: 10,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        backgroundColor: '#FFA726',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    chipText: {
        color: '#fff',
        fontWeight: '600',
    },
    previewBox: {
        backgroundColor: '#f4f9fc',
        padding: 16,
        borderRadius: 12,
        marginTop: 16,
    },
    previewText: {
        fontSize: 16,
        lineHeight: 24,
    },
    button: {
        marginTop: 24,
        backgroundColor: '#031956',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        minHeight: 120,
        padding: 12,
        borderRadius: 8,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
    },
    cancelBtn: {
        marginRight: 12,
    },
    cancelText: {
        color: '#999',
        fontSize: 16,
    },
    saveBtn: {
        backgroundColor: '#031956',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    saveText: {
        color: '#fff',
        fontWeight: '600',
    },
});
