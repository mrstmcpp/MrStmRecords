export const LinkBox = ({ link }) => {
    <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out text-center">
            <Icon icon="logos:soundcloud" className="h-6 w-6 text-orange-500" />
        </div>
    </a>
}