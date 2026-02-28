"use client";

import { useState, useCallback, RefObject } from "react";

export interface PDFExportOptions {
  filename: string;
  title: string;
  orientation?: "portrait" | "landscape";
  margin?: number;
}

export interface PDFExportState {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

export function usePDFExport() {
  const [state, setState] = useState<PDFExportState>({
    status: "idle",
    error: null,
  });

  const exportToPDF = useCallback(
    async (elementRef: RefObject<HTMLElement | null>, options: PDFExportOptions) => {
      if (!elementRef.current) {
        setState({ status: "error", error: "Elemento no encontrado" });
        return;
      }

      setState({ status: "loading", error: null });

      try {
        // Lazy-load dependencias pesadas solo cuando el usuario exporta
        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
          import("html2canvas"),
          import("jspdf"),
        ]);

        const element = elementRef.current;
        const { filename, title, orientation = "portrait", margin = 10 } = options;

        // Configurar dimensiones del PDF
        const pageWidth = orientation === "portrait" ? 210 : 297;
        const pageHeight = orientation === "portrait" ? 297 : 210;

        // Capturar el elemento como canvas
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Crear PDF
        const pdf = new jsPDF({
          orientation,
          unit: "mm",
          format: "a4",
        });

        // Agregar título
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        pdf.text(title, margin, margin + 5);

        // Agregar fecha
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        const fecha = new Date().toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        pdf.text(`Generado el ${fecha}`, margin, margin + 12);

        // Agregar línea separadora
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, margin + 16, pageWidth - margin, margin + 16);

        // Calcular posición inicial de la imagen
        const startY = margin + 22;

        // Si la imagen es muy alta, necesitamos múltiples páginas
        const availableHeight = pageHeight - startY - margin;

        if (imgHeight <= availableHeight) {
          // Cabe en una página
          pdf.addImage(imgData, "PNG", margin, startY, imgWidth, imgHeight);
        } else {
          // Necesita múltiples páginas
          let currentY = 0;
          let pageNum = 0;

          while (currentY < imgHeight) {
            if (pageNum > 0) {
              pdf.addPage();
            }

            const sourceY = pageNum === 0 ? 0 : currentY;
            const destY = pageNum === 0 ? startY : margin;
            const sliceHeight = pageNum === 0 ? availableHeight : pageHeight - margin * 2;

            // Calcular cuánto de la imagen mostrar
            const remainingHeight = imgHeight - currentY;
            const heightToShow = Math.min(sliceHeight, remainingHeight);

            // Crear canvas para esta porción
            const pageCanvas = document.createElement("canvas");
            pageCanvas.width = canvas.width;
            pageCanvas.height = (heightToShow / imgHeight) * canvas.height;

            const ctx = pageCanvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(
                canvas,
                0,
                (sourceY / imgHeight) * canvas.height,
                canvas.width,
                (heightToShow / imgHeight) * canvas.height,
                0,
                0,
                pageCanvas.width,
                pageCanvas.height
              );

              const pageImgData = pageCanvas.toDataURL("image/png");
              pdf.addImage(pageImgData, "PNG", margin, destY, imgWidth, heightToShow);
            }

            currentY += sliceHeight;
            pageNum++;
          }
        }

        // Agregar pie de página con URL
        const totalPages = pdf.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(150, 150, 150);
          pdf.text(
            "Generado en vidaencifras.com",
            pageWidth / 2,
            pageHeight - 5,
            { align: "center" }
          );
          pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 5, {
            align: "right",
          });
        }

        // Descargar el PDF
        pdf.save(`${filename}.pdf`);

        setState({ status: "success", error: null });

        // Resetear estado después de un tiempo
        setTimeout(() => {
          setState({ status: "idle", error: null });
        }, 2000);
      } catch (error) {
        console.error("Error al exportar PDF:", error);
        setState({
          status: "error",
          error: error instanceof Error ? error.message : "Error al generar PDF",
        });
      }
    },
    []
  );

  return {
    exportToPDF,
    ...state,
  };
}
