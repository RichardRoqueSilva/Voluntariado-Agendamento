export enum DiaSemanaEnum {
    SEGUNDA= 'SEGUNDA',
    TERCA = 'TERCA',
    QUARTA = 'QUARTA',
    QUINTA = 'QUINTA',
    SEXTA = 'SEXTA',
    SABADO = 'SABADO',
    DOMINGO = 'DOMINGO'
}

/**
 * Classe contendo a enumeração dos dias da semana
 */
export class DiaSemanaType {
    public static readonly SEGUNDA = new DiaSemanaType(DiaSemanaEnum.SEGUNDA, 'Segunda-feira', 1)
    public static readonly TERCA = new DiaSemanaType(DiaSemanaEnum.TERCA, 'Terça-feira', 2)
    public static readonly QUARTA = new DiaSemanaType(DiaSemanaEnum.QUARTA, 'Quarta-feira', 3)
    public static readonly QUINTA = new DiaSemanaType(DiaSemanaEnum.QUINTA, 'Quinta-feira', 4)
    public static readonly SEXTA = new DiaSemanaType(DiaSemanaEnum.SEXTA, 'Sexta-feira', 5)
    public static readonly SABADO = new DiaSemanaType(DiaSemanaEnum.SABADO, 'Sábado', 6)
    public static readonly DOMINGO = new DiaSemanaType(DiaSemanaEnum.DOMINGO, 'Domingo', 0)
    
    private constructor(public readonly valor: string, public readonly descricao: string, public readonly diaDaSemana: number) {}

    public static getAllValues(): DiaSemanaType[] {
        return Object.values(DiaSemanaType) as DiaSemanaType[]
    }

    public static getPorDiaDaSemana(diaDaSemana: number) {
        return DiaSemanaType.getAllValues()
            .find(d => d.diaDaSemana == diaDaSemana)
    }
}