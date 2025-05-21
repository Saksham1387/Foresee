interface EventDescriptionProps {
  description: string;
}

export const EventDescription = ({ description }: EventDescriptionProps) => {
  return (
    <div className="flex items-start gap-4 mb-6 bg-white p-3 rounded-2xl border border-gray-200 ">
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};
