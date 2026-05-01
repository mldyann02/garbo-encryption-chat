import { playfairBuildMatrix } from "../utils/ciphers";

interface PlayfairMatrixDisplayProps {
  matrixKey: string;
}

export function PlayfairMatrixDisplay({ matrixKey }: PlayfairMatrixDisplayProps) {
  if (!matrixKey) {
    return (
      <div className="playfair-matrix">
        <h4>Playfair Matrix</h4>
        <p className="matrix-placeholder">Enter a key to generate the matrix</p>
      </div>
    );
  }

  const matrix = playfairBuildMatrix(matrixKey);

  return (
    <div className="playfair-matrix">
      <h4>Playfair Matrix</h4>
      <table className="matrix-table">
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((letter, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`} className="matrix-cell">
                  {letter}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
