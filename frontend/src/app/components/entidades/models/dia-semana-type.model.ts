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
    public static readonly SEGUNDA = new DiaSemanaType(DiaSemanaEnum.SEGUNDA, 'Segunda-feira')
    public static readonly TERCA = new DiaSemanaType(DiaSemanaEnum.TERCA, 'Terça-feira')
    public static readonly QUARTA = new DiaSemanaType(DiaSemanaEnum.QUARTA, 'Quarta-feira')
    public static readonly QUINTA = new DiaSemanaType(DiaSemanaEnum.QUINTA, 'Quinta-feira')
    public static readonly SEXTA = new DiaSemanaType(DiaSemanaEnum.SEXTA, 'Sexta-feira')
    public static readonly SABADO = new DiaSemanaType(DiaSemanaEnum.SABADO, 'Sábado')
    public static readonly DOMINGO = new DiaSemanaType(DiaSemanaEnum.DOMINGO, 'Domingo')
    
    private constructor(public readonly valor: string, public readonly descricao: string) {}

    public static getAllValues(): DiaSemanaType[] {
        return Object.values(DiaSemanaType) as DiaSemanaType[]
    }
}