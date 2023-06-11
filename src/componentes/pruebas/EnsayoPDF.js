import React, { useEffect } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import replace from 'react-string-replace';
import { InlineMath } from "react-katex";

function EnsayoPDF(props) {
  const ecuacionRegex = /\[(.*?)\]/g; // Expresión regular para detectar partes de la cadena que contienen ecuaciones

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Hola</Text>
        </View>
        {props.ensayo.map((pregunta, index) => (
          <View key={index} style={styles.pregunta}>
            <Text style={styles.numeroPregunta}>Pregunta {index + 1}</Text>
            <Text style={styles.enunciado}>
              {replace(pregunta.question.replace('Â', ''), ecuacionRegex, (match, i) => (
                <InlineMath key={i} math={match} />
              ))}
            </Text>
            {pregunta.answer.map((respuesta, idk) => (
              <Text key={idk} style={styles.alternativa}>
                {String.fromCharCode(65 + idk)} - {replace(respuesta.label.replace('Â', ''), ecuacionRegex, (match, i) => (
                  <InlineMath key={i} math={match} />
                ))}
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );

  useEffect(() => {
    // Código a ejecutar después del primer renderizado
    // Puedes realizar acciones adicionales aquí si es necesario
  }, []);

  return (
    <div style={styles.container}>
      <div>
      <PDFDownloadLink document={<MyDocument />} fileName="ensayo.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Generando PDF..." : "Descargar PDF"
        }
      </PDFDownloadLink>
    </div>
    </div>
  );
}

const styles = StyleSheet.create({
  
  pdfViewer: {
    width: "100%",
    height: "100%",
  },
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  pregunta: {
    marginBottom: 20,
  },
  numeroPregunta: {
    fontSize: 16,
    fontWeight: "bold",
  },
  enunciado: {
    fontSize: 14,
    marginBottom: 10,
  },
  alternativa: {
    fontSize: 12,
    marginLeft: 20,
  },
});

export default EnsayoPDF;
