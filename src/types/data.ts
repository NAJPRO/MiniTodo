
export type Task = {
    id: number,
    description: string,
    priority: Priority
}

export type Priority = "Basse" | "Urgente" | "Moyenne";

export const ListPriority: Priority[] = ["Basse", "Moyenne", "Urgente"]

export const tasks: Task[] = [
    { id: 1, description: "Préparer la présentation pour la réunion client", priority: "Urgente" },
    { id: 2, description: "Répondre aux emails en attente", priority: "Moyenne" },
    { id: 3, description: "Faire le suivi des prospects", priority: "Moyenne" },
    { id: 4, description: "Mettre à jour la documentation de l'API", priority: "Basse" },
    { id: 5, description: "Réserver l'hôtel pour le voyage d'affaires", priority: "Urgente" },
    { id: 6, description: "Préparer le rapport financier mensuel", priority: "Urgente" },
    { id: 7, description: "Organiser une session de brainstorming avec l'équipe", priority: "Moyenne" },
    { id: 8, description: "Revoir le code de la nouvelle fonctionnalité", priority: "Moyenne" },
    { id: 9, description: "Planifier les publications sur les réseaux sociaux", priority: "Basse" },
    { id: 10, description: "Contacter le fournisseur pour négocier les prix", priority: "Moyenne" },
    { id: 11, description: "Faire une sauvegarde de la base de données", priority: "Urgente" },
    { id: 12, description: "Nettoyer le bureau et organiser les dossiers", priority: "Basse" },
    { id: 13, description: "Préparer le matériel pour la formation des nouveaux employés", priority: "Moyenne" },
    { id: 14, description: "Rechercher des solutions pour améliorer la performance du site web", priority: "Moyenne" },
    { id: 15, description: "Envoyer les factures aux clients", priority: "Urgente" }
];
