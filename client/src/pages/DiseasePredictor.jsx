import { useState } from 'react';

const DiseasePredictor = () => {
    const [symptom1, setSymptom1] = useState('');
    const [symptom2, setSymptom2] = useState('');
    const [symptom3, setSymptom3] = useState('');
    const [result, setResult] = useState('Please select symptoms.');

    const predictDisease = () => {
        let disease = "Please select symptoms.";

        if (symptom1 === "fever" && symptom2 === "cough" && symptom3 === "fatigue") {
            disease = "Possible Disease: Influenza";
        } else if (symptom1 === "fever" && symptom2 === "headache" && symptom3 === "nausea") {
            disease = "Possible Disease: Meningitis";
        } else if (symptom1 === "shortness of breath" && symptom2 === "fever" && symptom3 === "cough") {
            disease = "Possible Disease: Pneumonia";
        } else if (symptom1 === "fatigue" && symptom2 === "joint pain" && symptom3 === "rash") {
            disease = "Possible Disease: Lupus";
        } else if (symptom1 === "joint pain" && symptom2 === "fever" && symptom3 === "rash") {
            disease = "Possible Disease: Rheumatic Fever";
        } else if (symptom1 === "nausea" && symptom2 === "fever" && symptom3 === "headache") {
            disease = "Possible Disease: Viral Gastroenteritis";
        } else if (symptom1 === "cough" && symptom2 === "shortness of breath" && symptom3 === "fatigue") {
            disease = "Possible Disease: Chronic Obstructive Pulmonary Disease (COPD)";
        } else if (symptom1 === "rash" && symptom2 === "fever" && symptom3 === "fatigue") {
            disease = "Possible Disease: Measles";
        } else if (symptom1 === "nausea" && symptom2 === "headache" && symptom3 === "shortness of breath") {
            disease = "Possible Disease: Anaphylaxis";
        } else if (symptom1 === "cough" && symptom2 === "fever" && symptom3 === "shortness of breath") {
            disease = "Possible Disease: COVID-19";
        }
        // Add more conditions as needed...

        setResult(disease);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Common Disease Predictor</h1>

            <label style={styles.label} htmlFor="symptom1">Select Symptom 1</label>
            <select
                id="symptom1"
                value={symptom1}
                onChange={(e) => setSymptom1(e.target.value)}
                style={styles.select}
            >
                <option value="">-- Select a Symptom --</option>
                <option value="fever">Fever</option>
                <option value="cough">Cough</option>
                <option value="fatigue">Fatigue</option>
                <option value="headache">Headache</option>
                <option value="nausea">Nausea</option>
                <option value="shortness of breath">Shortness of Breath</option>
                <option value="joint pain">Joint Pain</option>
                <option value="rash">Rash</option>
            </select>

            <label style={styles.label} htmlFor="symptom2">Select Symptom 2</label>
            <select
                id="symptom2"
                value={symptom2}
                onChange={(e) => setSymptom2(e.target.value)}
                style={styles.select}
            >
                <option value="">-- Select a Symptom --</option>
                <option value="fever">Fever</option>
                <option value="cough">Cough</option>
                <option value="fatigue">Fatigue</option>
                <option value="headache">Headache</option>
                <option value="nausea">Nausea</option>
                <option value="shortness of breath">Shortness of Breath</option>
                <option value="joint pain">Joint Pain</option>
                <option value="rash">Rash</option>
            </select>

            <label style={styles.label} htmlFor="symptom3">Select Symptom 3</label>
            <select
                id="symptom3"
                value={symptom3}
                onChange={(e) => setSymptom3(e.target.value)}
                style={styles.select}
            >
                <option value="">-- Select a Symptom --</option>
                <option value="fever">Fever</option>
                <option value="cough">Cough</option>
                <option value="fatigue">Fatigue</option>
                <option value="headache">Headache</option>
                <option value="nausea">Nausea</option>
                <option value="shortness of breath">Shortness of Breath</option>
                <option value="joint pain">Joint Pain</option>
                <option value="rash">Rash</option>
            </select>

            <button onClick={predictDisease} style={styles.button}>
                Predict Disease
            </button>

            <div style={styles.result}>{result}</div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
    },
    title: {
        fontSize: '2em',
        color: '#2c3e50',
    },
    label: {
        fontSize: '1.5em',
        color: '#34495e',
        margin: '20px 0 10px',
        display: 'block',
    },
    select: {
        width: '100%',
        padding: '15px',
        fontSize: '1.5em',
        border: '2px solid #3498db',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    button: {
        width: '100%',
        padding: '15px',
        fontSize: '1.5em',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    result: {
        marginTop: '20px',
        fontSize: '1.5em',
        color: '#333',
        padding: '10px',
        border: '1px solid #3498db',
        borderRadius: '5px',
    },
};

export default DiseasePredictor;
